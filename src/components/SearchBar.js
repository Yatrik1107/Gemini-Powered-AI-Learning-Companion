import React from 'react';

const SearchBar = ({ searchQuery, handleSearch }) => (
  <input
    type="text"
    placeholder="Search notes..."
    value={searchQuery}
    onChange={handleSearch}
  />
);

export default SearchBar;
