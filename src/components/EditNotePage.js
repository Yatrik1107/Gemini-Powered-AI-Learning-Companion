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
      <h1>Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content"
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditNotePage;
