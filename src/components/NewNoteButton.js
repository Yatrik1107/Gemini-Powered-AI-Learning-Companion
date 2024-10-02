// NewNoteButton.js
import React from 'react';

const NewNoteButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="new-note-button">
      New Note
    </button>
  );
};

export default NewNoteButton;
