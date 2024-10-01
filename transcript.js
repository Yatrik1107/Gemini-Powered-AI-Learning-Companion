// Start by making sure the assemblyai package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
  apiKey: '7c3977d746f4442794ad074696e35175',
});

// const FILE_URL =
//   'https://assembly.ai/sports_injuries.mp3';

// You can also transcribe a local file by passing in a file path
const FILE_URL = './RT63_Regular.mp3';

// Request parameters 
const data = {
  audio: FILE_URL
}

const run = async () => {
  const transcript = await client.transcripts.transcribe(data);
  console.log(transcript.text);
};

run(); 
