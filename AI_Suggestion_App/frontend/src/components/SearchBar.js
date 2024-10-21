import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css';

function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', updateDropdownPosition);
        return () => {
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [input]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);
        setCursorPosition(e.target.selectionStart);
        setSelectedIndex(-1);
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
        const beforeCursor = input.slice(0, cursorPosition);
        const afterCursor = input.slice(cursorPosition);
        const newInput = beforeCursor + suggestion + afterCursor;
        setInput(newInput);
        setCursorPosition(cursorPosition + suggestion.length);
        setSuggestions([]);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            const newValue = input.slice(0, cursorPosition) + '\n' + input.slice(cursorPosition);
            setInput(newValue);
            setCursorPosition(cursorPosition + 1);
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.selectionStart = cursorPosition + 1;
                    inputRef.current.selectionEnd = cursorPosition + 1;
                }
                updateDropdownPosition();
            }, 0);
        } else if (suggestions.length > 0) {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prevIndex => (prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1));
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prevIndex => (prevIndex >= suggestions.length - 1 ? 0 : prevIndex + 1));
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
            const lineHeight = parseInt(getComputedStyle(inputRef.current).lineHeight);
            const { selectionStart, value, scrollTop } = inputRef.current;
            
            // Calculate the position of the cursor
            const textBeforeCursor = value.substring(0, selectionStart);
            const linesBeforeCursor = textBeforeCursor.split('\n');
            const currentLineIndex = linesBeforeCursor.length - 1;
            const currentLineText = linesBeforeCursor[currentLineIndex];
            
            const textWidth = getTextWidth(currentLineText, getComputedStyle(inputRef.current));
            const cursorTop = (currentLineIndex * lineHeight) - scrollTop;

            // Adjust the left position to ensure it doesn't go beyond the textarea's width
            const maxLeft = inputRect.width - 10; // 10px padding
            const left = Math.min(textWidth, maxLeft);

            setDropdownPosition({
                top: inputRect.top + window.scrollY + cursorTop + lineHeight,
                left: left
            });
        }
    };

    const getTextWidth = (text, style) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = `${style.fontSize} ${style.fontFamily}`;
        return context.measureText(text).width;
    };

    const adjustTextareaHeight = () => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight)}px`;
        }
    };

    return (
        <div className="search-bar-container" ref={containerRef}>
            <textarea
                ref={inputRef}
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onSelect={(e) => {
                    setCursorPosition(e.target.selectionStart);
                    updateDropdownPosition();
                }}
                onScroll={updateDropdownPosition}
                placeholder="Type something here..."
                className="search-bar"
                rows={1}
            />
            
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