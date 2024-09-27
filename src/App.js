import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';
import NewNoteButton from './components/NewNoteButton';
import EditNotePage from './components/EditNotePage'; // New component for editing notes

const AppContent = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation(); // Moved inside the Router context

  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now(), date: new Date() }]);
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
      {/* Conditionally show Header and SearchBar only on the main page */}
      {location.pathname === '/' && (
        <>
          <Header onNewNoteClick={() => addNote({ title: "New Note", content: "Note content" })} />
          <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        </>
      )}
      
      <Routes>
        <Route 
          path="/" 
          element={<NoteList notes={filteredNotes} editNote={editNote} deleteNote={deleteNote} />} 
        />
        <Route 
          path="/edit/:id" 
          element={<EditNotePage notes={notes} editNote={editNote} />} 
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent /> {/* App logic inside Router */}
    </Router>
  );
};

export default App;
