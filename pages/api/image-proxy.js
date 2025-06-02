import { google } from 'googleapis';

/**
 * API route that directly fetches images from Google Drive using the Drive API
 * and serves them to the client, bypassing CORS and authorization issues
 */
export default async function handler(req, res) {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'No image ID provided' });
    }
    
    console.log(`Fetching Google Drive image: ${id}`);
    
    // Configure Google Drive API
    const drive = await configureGoogleDrive();
    
    // Get the file metadata to determine MIME type
    const fileMetadata = await drive.files.get({
      fileId: id,
      fields: 'mimeType,name'
    });
    
    // Set appropriate content type
    const mimeType = fileMetadata.data.mimeType;
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    
    // Get the file contents with alt=media to get binary content
    const response = await drive.files.get({
      fileId: id,
      alt: 'media'
    }, { responseType: 'stream' });
    
    // Pipe the file content directly to the response
    response.data.pipe(res);
    
  } catch (error) {
    console.error('Error proxying Google Drive image:', error);
    
    // Return an error response with detailed error information
    return res.status(500).json({
      error: 'Failed to fetch image from Google Drive',
      message: error.message,
      details: error.response?.data || error.stack,
      env: {
        // Log whether credentials are available (without exposing them)
        hasServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
        hasFolderId: !!process.env.GOOGLE_DRIVE_FOLDER_ID,
      }
    });
  }
}

async function configureGoogleDrive() {
  try {
    // Try to load from environment variables first
    const useEnvVars = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && 
                      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    
    let auth;
    
    if (useEnvVars) {
      console.log('Using environment variables for Google Drive authentication');
      
      auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n')
        },
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
      });
    } else {
      // No fallback available in production - must use environment variables
      throw new Error('Google Drive API credentials not found in environment variables. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.');
    }
    
    return google.drive({ version: 'v3', auth });
  } catch (error) {
    console.error('Error configuring Google Drive:', error);
    throw error;
  }
}
