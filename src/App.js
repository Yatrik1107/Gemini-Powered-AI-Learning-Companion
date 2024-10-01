import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { AssemblyAI } from 'assemblyai';

// Get the current file's path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

// Initialize AssemblyAI client
const assemblyaiClient = new AssemblyAI({
  apiKey: ASSEMBLYAI_API_KEY,
});

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, '../public')));
app.use(express.json());  // To parse JSON bodies

// Route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public', 'index.html'));
});

// Endpoint to handle transcription process
app.post('/generate-notes', async (req, res) => {
  const mp3URL = req.body.url;

  console.log('Transcription request received for URL:', mp3URL);

  try {
    // Step 1: Request transcription from AssemblyAI
    console.log('Sending transcription request to AssemblyAI...');
    const transcriptResponse = await assemblyaiClient.transcripts.create({
      audio_url: mp3URL,
    });

    const transcriptId = transcriptResponse.id;
    console.log(`Transcription ID received: ${transcriptId}`);

    // Step 2: Poll the AssemblyAI API to check transcription status
    let transcriptionCompleted = false;
    let transcriptText = '';

    while (!transcriptionCompleted) {
      console.log('Checking transcription status...');
      const transcriptStatus = await assemblyaiClient.transcripts.get(transcriptId);

      if (transcriptStatus.status === 'completed') {
        console.log('Transcription completed successfully.');
        transcriptText = transcriptStatus.text;
        transcriptionCompleted = true;
      } else if (transcriptStatus.status === 'failed') {
        console.error('Transcription failed.');
        return res.json({ error: 'Transcription failed. Please try again.' });
      } else {
        // Wait for a short period before checking the status again
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    // Step 3: Save the transcription to a text file
    fs.writeFileSync('transcription.txt', transcriptText);
    console.log('Transcription saved to file.');

    // Respond with the transcription text
    res.json({ transcription: transcriptText });
  } catch (error) {
    console.error('Error generating notes:', error);
    res.json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
