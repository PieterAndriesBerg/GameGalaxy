import React, { useEffect, useState } from "react";

import "./SearchBar.css";
import { fetchGamesByName } from "../../helpers/api.js";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const fetchSuggestions = debounce(async (searchTerm) => {
    const results = await fetchGamesByName(searchTerm);
    setSuggestions(results);
  }, 500);

  useEffect(() => {
    if (search) {
      fetchSuggestions(search);
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a game..."
        className="searchBar"
        value={search}
        onChange={handleSearchChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion.name)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
