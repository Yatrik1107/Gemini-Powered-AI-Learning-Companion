import React from 'react';
import NewNoteButton from './NewNoteButton';

const Header = ({ onNewNoteClick }) => (
  <header className="header">
    <h1>My Notes</h1>
    <NewNoteButton onClick={onNewNoteClick} /> {/* New Note button here */}
  </header>
);


export default Header;
