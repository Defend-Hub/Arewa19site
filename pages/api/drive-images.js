import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Configure Google Drive API
const configureGoogleDrive = () => {
  try {
    // First try to use environment variables if available
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
      console.log('Using environment variables for Google Drive authentication');
      const auth = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        null,
        process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/drive.readonly']
      );
      
      return google.drive({ version: 'v3', auth });
    }
    
    // If environment variables are not available, try to use credential file
    const credentialPath = path.join(process.cwd(), 'pages', 'api', 'striking-effort-439520-v9-cf3e883365bc.json');
    
    if (fs.existsSync(credentialPath)) {
      console.log('Using credential file for Google Drive authentication');
      const auth = new google.auth.GoogleAuth({
        keyFile: credentialPath,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      });
      
      return google.drive({ version: 'v3', auth });
    }
    
    throw new Error('No valid Google Drive authentication credentials found');
  } catch (error) {
    console.error('Error configuring Google Drive:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  try {
    // Get folder ID from query parameter or use default
    // Hardcoded default folder ID as fallback - replace with your actual Google Drive folder ID
    const DEFAULT_FOLDER_ID = '1HF_7yMujtVKz6jP3KD-cIEYZZqXTGcBu';
    const folderId = req.query.folderId || process.env.GOOGLE_DRIVE_FOLDER_ID || DEFAULT_FOLDER_ID;
    const stateFilter = req.query.state || 'all';

    if (!folderId) {
      return res.status(400).json({ error: 'No folder ID provided' });
    }

    const drive = configureGoogleDrive();

    // List files in the specified folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`,
      fields: 'files(id, name, thumbnailLink, webContentLink, imageMediaMetadata, description)',
      orderBy: 'createdTime desc',
      pageSize: 100,
    });

    const files = response.data.files;
    
    console.log(`Found ${files.length} images in Google Drive folder`);    
    
    // Process files to extract metadata and state information
    const processedFiles = files.map(file => {
      // Try to extract state from file description or name
      let state = 'unknown';
      if (file.description) {
        // Look for state tag in description (e.g., "state: kaduna")
        const stateMatch = file.description.toLowerCase().match(/state:\s*(\w+)/);
        if (stateMatch) {
          state = stateMatch[1].toLowerCase();
        }
      } else {
        // Try to extract state from filename
        const stateList = ['kaduna', 'kano', 'borno', 'fct', 'katsina', 'jigawa', 'sokoto', 'zamfara', 'kebbi', 'bauchi', 'gombe', 'yobe', 'adamawa', 'taraba', 'plateau', 'nasarawa', 'niger', 'kwara', 'kogi'];
        const fileName = file.name.toLowerCase();
        
        for (const potentialState of stateList) {
          if (fileName.includes(potentialState)) {
            state = potentialState;
            break;
          }
        }
      }
      
      // Store all possible image URL formats to try on the frontend
      const imageUrls = {
        // Format 1: Direct export view link (most direct but sometimes blocked by CORS)
        directLink: `https://drive.google.com/uc?export=view&id=${file.id}`,
        
        // Format 2: If thumbnailLink exists, modify it to get a larger preview
        // This is often the most reliable for displaying in an <img> tag
        thumbnailUrl: file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+$/, '=s1000') : null,
        
        // Format 3: Alternative Google Drive thumbnail format
        altThumbnail: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
        
        // Format 4: Web content link if available (usually downloads the file)
        webContentLink: file.webContentLink || null,
        
        // Format 5: Googleusercontent format
        googleusercontent: `https://lh3.googleusercontent.com/d/${file.id}=s1000`,
      };
      
      // Choose the best image URL to use as primary (prioritizing the most reliable formats)
      const imageUrl = imageUrls.thumbnailUrl || 
                      imageUrls.directLink || 
                      imageUrls.altThumbnail || 
                      imageUrls.googleusercontent || 
                      '/assets/img/placeholder.jpg';
                      
      console.log(`Processed image: ${file.name}, ID: ${file.id}, State: ${state}`);
      
      return {
        id: file.id,
        name: file.name,
        imageUrl,
        thumbnailUrl: file.thumbnailLink,
        webContentLink: file.webContentLink,
        imageUrls, // Include all URL formats
        state,
        metadata: file.imageMediaMetadata || {},
      };
    });

    // Filter images by state if requested
    let filteredFiles = processedFiles;
    if (stateFilter !== 'all') {
      filteredFiles = processedFiles.filter(file => file.state === stateFilter.toLowerCase());
    }

    return res.status(200).json({ images: filteredFiles });
  } catch (error) {
    console.error('Error fetching Google Drive images:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch images from Google Drive',
      details: error.message 
    });
  }
}
