import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [videoId, setVideoId] = useState('');
    const [videoDetails, setVideoDetails] = useState(null);
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);

    const fetchVideoDetails = async () => {
        try {
          console.log("Fetching video details..."); // Add this log to see if it's called
          const response = await axios.post('http://localhost:5000/api/video', { videoId });
          setVideoDetails(response.data);
          console.log("Video details fetched:", response.data); // Add this log to see the response
        } catch (error) {
          console.error('Error fetching video details', error);
        }
      };

    // Add note
    const addNote = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/notes', { videoId, note });
            setNotes(response.data.notes);
            setNote('');
        } catch (error) {
            console.error('Error adding note', error);
        }
    };

    return (
        <div>
            <h1>Learning Website</h1>
            <input 
                type="text" 
                placeholder="Enter YouTube Video ID" 
                value={videoId} 
                onChange={e => setVideoId(e.target.value)} 
            />
            <button onClick={fetchVideoDetails}>Fetch Video</button>

            {videoDetails && (
                <div>
                    <h2>{videoDetails.title}</h2>
                    <p>{videoDetails.description}</p>
                    <div>
                        <h3>Video Player</h3>
                        <iframe 
                            width="560" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${videoId}`} 
                            title="YouTube video player" 
                            allowFullScreen 
                        ></iframe>
                    </div>
                    <div>
                        <h3>Add Note</h3>
                        <textarea 
                            value={note} 
                            onChange={e => setNote(e.target.value)} 
                        />
                        <button onClick={addNote}>Add Note</button>
                    </div>
                    <div>
                        <h3>Notes</h3>
                        <ul>
                            {notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
