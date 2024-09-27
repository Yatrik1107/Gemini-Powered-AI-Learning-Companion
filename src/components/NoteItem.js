import React from 'react';

const NoteItem = ({ note, editNote, deleteNote }) => {
    const handleEdit = () => {
      const updatedContent = prompt("Edit your note", note.content);
      if (updatedContent) {
        editNote(note.id, { content: updatedContent });
      }
    };
  
    return (
      <div className="note-item">
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => deleteNote(note.id)}>Delete</button>
      </div>
    );
};

export default NoteItem;
