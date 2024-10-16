
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css';

function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', updateDropdownPosition);
        return () => {
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [input]);

    // Handle input changes and fetch suggestions
    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);
        setSelectedIndex(-1); // Reset selected index on input change
        updateDropdownPosition();

        if (value.length > 0) {
            try {
                // Fetch suggestions from the backend based on user input
                const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
                setSuggestions(response.data.suggestions);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setSuggestions([]);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (suggestions.length > 0) {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prevIndex => {
                        const newIndex = prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1;
                        setInput(suggestions[newIndex]); // Update input to the highlighted suggestion
                        return newIndex;
                    });
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prevIndex => {
                        const newIndex = prevIndex >= suggestions.length - 1 ? 0 : prevIndex + 1;
                        setInput(suggestions[newIndex]); // Update input to the highlighted suggestion
                        return newIndex;
                    });
                    break;
                case 'Enter':
                    if (selectedIndex !== -1) {
                        e.preventDefault();
                        handleSuggestionClick(suggestions[selectedIndex]);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const updateDropdownPosition = () => {
        if (inputRef.current && containerRef.current) {
            const inputRect = inputRef.current.getBoundingClientRect();
            const caretPos = inputRef.current.selectionEnd;
            const textBeforeCaret = inputRef.current.value.substring(0, caretPos);
            const textWidth = getTextWidth(textBeforeCaret, getComputedStyle(inputRef.current));

            setDropdownPosition({
                top: inputRect.height + 60,
                left: Math.min(textWidth, inputRect.width - 10)
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
                onKeyDown={handleKeyDown}
                onKeyUp={updateDropdownPosition}
                onClick={updateDropdownPosition}
                placeholder="Type something here..."
                className="search-bar"
                style={{ position: "relative", zIndex: 2 }}
            />
            
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
                <SuggestionsDropdown
                    suggestions={suggestions}
                    onClick={handleSuggestionClick}
                    position={dropdownPosition}
                    selectedIndex={selectedIndex}
                />
            )}
        </div>
    );
}

export default SearchBar;
