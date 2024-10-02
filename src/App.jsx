import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NoteList from "./components/NoteList";
import NewNoteButton from "./components/NewNoteButton";
import EditNotePage from "./components/EditNotePage"; // New component for editing notes
import { Card } from "antd";
import Shubham from "./Shubham";

const AppContent = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // Moved inside the Router context

  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now(), date: new Date() }]);
  };

  const editNote = (id, updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note))
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [activeTabKey1, setActiveTabKey1] = useState("1");

  const tabList = [
    {
      key: "1",
      tab: "Notes",
    },
    {
      key: "2",
      tab: "Notes with Transcription",
    },
  ];

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  const renderItems = {
    1: (
      <div>
        <Header
          onNewNoteClick={() =>
            addNote({ title: "New Note", content: "Note content" })
          }
        />
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <NoteList
          notes={filteredNotes}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      </div>
    ),
    2: (
      <div>
        {/* Content for the Archived tab */}
        {/* Implement archived notes functionality here */}
        <Shubham />
      </div>
    ),
  };

  return (
    <div className="app">
      {location.pathname === "/" && (
        <Card
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
          className="border-none"
        >
          {renderItems[activeTabKey1]}
        </Card>
      )}

      <Routes>
        <Route
          path="/edit/:id"
          element={<EditNotePage notes={notes} editNote={editNote} />}
        />
        {/* Add more routes if necessary */}
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
