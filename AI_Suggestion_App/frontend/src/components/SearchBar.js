import React, { useState, useRef } from 'react';
import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css'; 


function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const inputRef = useRef(null);
//    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);

                                                                 // Get the text cursor position and set the dropdown position dynamically
        const { top, left } = getCaretCoordinates(e.target);
        setDropdownPosition({ top: top + 20, left:left + 5 }); 

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

                                                                        // Function to calculate the caret position within the input
    const getCaretCoordinates = (element) => {
        const rect = element.getBoundingClientRect();
        const caretPos = element.selectionEnd;
        const textBeforeCaret = element.value.substring(0, caretPos);
        const textWidth = getTextWidth(textBeforeCaret, getComputedStyle(element));

        return {
            top: rect.top + window.scrollY,
            left: rect.left + textWidth + window.scrollX
        };
    };

                                                                                            //  to measure text width via Utility function
    const getTextWidth = (text, style) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = `${style.fontSize} ${style.fontFamily}`;
        return context.measureText(text).width;
    };

    return (
        <div className="search-bar-container">
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Type something here..."
                className="search-bar"
            />
            {suggestions.length > 0 && (
                <SuggestionsDropdown suggestions={suggestions}onClick={handleSuggestionClick} 
                position={dropdownPosition}
                />
            )}
        </div>
    );
}

export default SearchBar;