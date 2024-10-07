import React, { useState } from 'react';
import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css'; 


function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);

        if (value.length > 0) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
                setSuggestions(response.data.suggestions);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Type something here..."
                className="search-bar"
            />
            {suggestions.length > 0 && (
                <SuggestionsDropdown suggestions={suggestions} onClick={handleSuggestionClick} />
            )}
        </div>
    );
}

export default SearchBar;
