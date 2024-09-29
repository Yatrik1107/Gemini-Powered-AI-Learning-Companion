const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require("dotenv");

dotenv.config(); // Loads environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// YouTube Video Schema
const videoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: String,
  description: String,
  topics: [String],
});

const Video = mongoose.model('Video', videoSchema);

// Fetch Video Details from YouTube API
async function fetchVideoDetails(videoId) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const videoDetails = response.data.items[0].snippet;
    return videoDetails;
  } catch (error) {
    console.error('Error fetching video details:', error);
  }
}

// Route to Add YouTube Video to Database
app.post('/add-video', async (req, res) => {
  const videoId = req.body.videoId; // Assume videoId is extracted from the frontend

  try {
    const videoDetails = await fetchVideoDetails(videoId);
    
    // Save video to database
    const newVideo = new Video({
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: videoDetails.title,
      description: videoDetails.description,
      topics: [], // You can parse topics based on video description or use another API
    });

    await newVideo.save();
    res.status(200).json({ message: 'Video added successfully', video: newVideo });
  } catch (error) {
    res.status(500).json({ message: 'Error adding video', error });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
