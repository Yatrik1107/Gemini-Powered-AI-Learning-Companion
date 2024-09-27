import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditNotePage = ({ notes, editNote }) => {
  const { id } = useParams();
  const note = notes.find(note => note.id === parseInt(id));
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note.id, { title, content });
    navigate('/');
  };

  return (
    <div className="edit-note-page">
      <h1>Edit Your Note</h1>
      <div className="note-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="note-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            required
          />
          <textarea
            className="note-content-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note Content"
            required
          />
          <div className="button-group">
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotePage;
