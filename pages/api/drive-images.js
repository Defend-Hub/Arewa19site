import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

// Configure Google Drive API
const configureGoogleDrive = () => {
  // Load credentials from JSON file
  const keyFilePath = path.join(process.cwd(), 'pages/api/striking-effort-439520-v9-cf3e883365bc.json');
  const credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
  
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/drive.readonly']
  );

  return google.drive({ version: 'v3', auth });
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
      
      // Generate multiple URL options for the frontend to try
      // Option 1: Direct download link
      let imageUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
      
      // Option 2: If thumbnailLink exists, modify it to get a larger preview
      // This is often more reliable for display purposes
      let thumbnailUrl = file.thumbnailLink;
      if (thumbnailUrl) {
        // The thumbnail link typically looks like this: https://lh3.googleusercontent.com/...=s220
        // Change the size parameter to get a larger image
        thumbnailUrl = thumbnailUrl.replace(/=s\d+$/, '=s1000');
        // Use this as the primary URL since it's often more reliable
        imageUrl = thumbnailUrl;
      }
      
      // Option 3: Alternative Google Drive URL format
      const altImageUrl = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
      
      return {
        id: file.id,
        name: file.name,
        imageUrl,
        thumbnailUrl: file.thumbnailLink,
        altImageUrl,
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
