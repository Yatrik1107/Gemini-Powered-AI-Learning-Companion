import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  const editNote = (id, updatedNote) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...updatedNote } : note));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Header onNewNoteClick={() => addNote({ title: "New Note", content: "Note content" })} />
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="notes-container">
        <NoteList notes={filteredNotes} editNote={editNote} deleteNote={deleteNote} />
      </div>
    </div>
  );
};



export default App;
