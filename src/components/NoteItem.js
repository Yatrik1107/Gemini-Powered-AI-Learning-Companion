import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoteItem = ({ note, deleteNote }) => {
  const navigate = useNavigate();
  const date = new Date(note.date).toLocaleDateString();
  const time = new Date(note.date).toLocaleTimeString();

  const handleEdit = () => {
    navigate(`/edit/${note.id}`);
  };

  return (
    <div className="note-item">
      <h2>{note.title}</h2>
      <p>{note.content.substring(0, 100)}...</p> {/* Show first few lines of content */}
      <div className="note-footer">
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => deleteNote(note.id)}>Delete</button>
    </div>
  );
};

export default NoteItem;
