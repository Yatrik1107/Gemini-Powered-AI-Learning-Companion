import express from 'express';
import { AssemblyAI } from 'assemblyai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express(); // Ensure this line is present
const PORT = process.env.PORT || 3000;
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

// Initialize AssemblyAI client
const assemblyaiClient = new AssemblyAI({
    apiKey: ASSEMBLYAI_API_KEY,
});

app.use(express.json());
app.use(express.static('public')); // Serve static HTML file

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Endpoint to handle transcription process
app.post('/generate-notes', async (req, res) => {
    const mp3URL = req.body.url;

    console.log('Transcription process started for:', mp3URL); // Log when transcription starts

    try {
        // Request transcription from AssemblyAI by passing MP3 URL directly
        const transcriptResponse = await assemblyaiClient.transcripts.create({
            audio_url: mp3URL, // Pass the MP3 URL
        });

        const transcriptId = transcriptResponse.id;

        let transcriptionCompleted = false;
        let transcriptText = '';

        while (!transcriptionCompleted) {
            const transcriptStatus = await assemblyaiClient.transcripts.get(transcriptId);

            if (transcriptStatus.status === 'completed') {
                transcriptText = transcriptStatus.text;
                transcriptionCompleted = true;
            } else if (transcriptStatus.status === 'failed') {
                console.log('Transcription failed for:', mp3URL); // Log failure
                return res.json({ error: 'Transcription failed. Please try again.' });
            } else {
                // Wait for a short period before checking the status again
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        // Save the transcription to a text file
        fs.writeFileSync('transcription.txt', transcriptText);
        
        console.log('Transcription completed for:', mp3URL); // Log when transcription is completed

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
