import { google } from 'googleapis';
import axios from 'axios';
import https from 'https';
import fs from 'fs';
import path from 'path';

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
    
    // If we can't get the image, try to serve a placeholder
    try {
      const placeholderPath = path.join(process.cwd(), 'public', 'assets', 'img', 'placeholder.jpg');
      const placeholderExists = fs.existsSync(placeholderPath);
      
      if (placeholderExists) {
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(placeholderPath).pipe(res);
      } else {
        res.status(404).send('Image not found');
      }
    } catch (fallbackError) {
      console.error('Error serving placeholder:', fallbackError);
      res.status(500).send('Error serving image');
    }
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
      // Fallback to local credentials file
      console.log('Using local credentials file for Google Drive authentication');
      
      const credentialsPath = path.join(process.cwd(), 'google-credentials.json');
      
      if (!fs.existsSync(credentialsPath)) {
        throw new Error(`Credentials file not found at ${credentialsPath}`);
      }
      
      auth = new google.auth.GoogleAuth({
        keyFile: credentialsPath,
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
      });
    }
    
    return google.drive({ version: 'v3', auth });
  } catch (error) {
    console.error('Error configuring Google Drive:', error);
    throw error;
  }
}
