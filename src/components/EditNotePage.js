import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditNotePage = ({ notes, editNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find(note => note.id === parseInt(id, 10));

  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      editNote(note.id, { title, content });
      navigate('/');
    } else {
      alert('Title and content cannot be empty!');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="edit-note-page">
      <div className="edit-note-header">
        <h1>Edit Note</h1>
      </div>
      <div className="note-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          className="note-title-input"
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          className="note-content-editor"
          theme="snow"
        />
      </div>
      <div className="button-group">
        <button onClick={handleSave} className="save-button">Save</button>
        <button onClick={handleCancel} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default EditNotePage;
