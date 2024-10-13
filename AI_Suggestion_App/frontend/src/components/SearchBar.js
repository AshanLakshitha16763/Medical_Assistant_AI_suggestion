import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css';

function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', updateDropdownPosition);
        return () => {
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [input]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);

        updateDropdownPosition();

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
        setSuggestions([]);
    };

    const updateDropdownPosition = () => {
        if (inputRef.current && containerRef.current) {
            const inputRect = inputRef.current.getBoundingClientRect();
            const caretPos = inputRef.current.selectionEnd;
            const textBeforeCaret = inputRef.current.value.substring(0, caretPos);
            const textWidth = getTextWidth(textBeforeCaret, getComputedStyle(inputRef.current));

            setDropdownPosition({
                top: inputRect.height + 60, // Added 5 pixels to move the dropdown lower
                left: Math.min(textWidth, inputRect.width - 10) // Ensure dropdown doesn't go beyond input width
            });
        }
    };

    const getTextWidth = (text, style) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = `${style.fontSize} ${style.fontFamily}`;
        return context.measureText(text).width;
    };

    return (
        <div className="search-bar-container" ref={containerRef}>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                onKeyUp={updateDropdownPosition}
                onClick={updateDropdownPosition}
                placeholder="Type something here..."
                className="search-bar"
            />
            {suggestions.length > 0 && (
                <SuggestionsDropdown
                    suggestions={suggestions}
                    onClick={handleSuggestionClick}
                    position={dropdownPosition}
                />
            )}
        </div>
    );
}

export default SearchBar;