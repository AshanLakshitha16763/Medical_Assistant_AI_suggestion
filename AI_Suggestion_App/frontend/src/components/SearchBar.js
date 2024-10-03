import React, { useState } from 'react';
import axios from 'axios';

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

    return (
        <div>
            <input 
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Type something..."
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
