const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Video Schema and Model
const videoSchema = new mongoose.Schema({
    videoId: String,
    title: String,
    description: String,
    notes: [String],
    topics: [String]
});
const Video = mongoose.model('Video', videoSchema);

// Route to fetch video details from YouTube API
app.post('/api/video', async (req, res) => {
    const { videoId } = req.body;
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try {
        const videoResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );

        const videoData = videoResponse.data.items[0].snippet;
        const video = new Video({
            videoId,
            title: videoData.title,
            description: videoData.description,
            notes: [],
            topics: []  // Topic extraction can be added here
        });

        await video.save();
        res.json(video);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video details' });
    }
});

// Route to add notes to a video
app.post('/api/notes', async (req, res) => {
    const { videoId, note } = req.body;
    try {
        const video = await Video.findOne({ videoId });
        if (video) {
            video.notes.push(note);
            await video.save();
            res.json(video);
        } else {
            res.status(404).json({ error: 'Video not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add note' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
