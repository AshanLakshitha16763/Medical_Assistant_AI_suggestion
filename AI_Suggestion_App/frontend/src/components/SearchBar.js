import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css';


function SearchBar() {

// state Management - keeping track of the input value, suggestions, dropdown position, selected index, and cursor position 

    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [cursorPosition, setCursorPosition] = useState(0);

// References - Directly access to DOM elements
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const [suggestion, setSuggestion] = useState("");
    

// Effect hooks - Automatically update the dropdown position when the window is resized
    useEffect(() => {
        window.addEventListener('resize', updateDropdownPosition);
        return () => {
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [input]);

    // Handle input changes and fetch suggestions
    // const handleChange = async (e) => {
    //     const value = e.target.value;
    //     setInput(value);
    //     setSelectedIndex(-1); // Reset selected index on input change
    //     updateDropdownPosition();

    //     if (value.length > 0) {
    //         try {
    //             // Fetch suggestions from the backend based on user input
    //             const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
    //             setSuggestions(response.data.suggestions);
    //         } catch (error) {
    //             console.error("Error fetching suggestions:", error);
    //         }
    //     } else {
    //         setSuggestions([]);
    //     }
    // };

    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);


// Handling user input - Update the input value, fetch suggestions, and update the dropdown position
    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);
        setCursorPosition(e.target.selectionStart);
        setSelectedIndex(-1);
        updateDropdownPosition();
    

        
        // if (value.length > 0) {
        //   try {
        //     // Fetch suggestions from the backend based on user input
        //     const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
        //     setSuggestions(response.data.suggestions);
            
        //     // Set the first suggestion if available
        //     if (response.data.suggestions.length > 0) {
        //       setSuggestion(value + response.data.suggestions[0].slice(value.length));
        //     } else {
        //       setSuggestion(value);
//------------------NEW CODE------------------
        // Get the current line based on cursor position
        const lines = value.split('\n');
        let currentLineIndex = 0;
        let charCount = 0;
        
        for (let i = 0; i < lines.length; i++) {
            charCount += lines[i].length + 1; // +1 for the newline character
            if (charCount > e.target.selectionStart) {
                currentLineIndex = i;
                break;
            }
        }
        
        const currentLine = lines[currentLineIndex];
//------------------------------------
        if (currentLine && currentLine.length > 0) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/suggest', { input: currentLine });
                setSuggestions(response.data.suggestions);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        }else {
          setSuggestions([]);
          setSuggestion(value); // Clear suggestion if input is empty
        }
    };
      
    


// Handling suggestion selection - Insert the selected suggestion into the input value
const handleSuggestionClick = (suggestion) => {
    const lines = input.split('\n');
    let currentLineIndex = 0;
    let charCount = 0;

    for (let i = 0; i < lines.length; i++) {
        charCount += lines[i].length + 1; // +1 for the newline character
        if (charCount > cursorPosition) {
            currentLineIndex = i;
            break;
        }
    }

    // Replace only the current line with the suggestion
    lines[currentLineIndex] = suggestion;
    const newInput = lines.join('\n');

    // Calculate the position where cursor should be after the suggestion
    let newCursorPosition = 0;
    for (let i = 0; i < currentLineIndex; i++) {
        newCursorPosition += lines[i].length + 1;
    }
    newCursorPosition += suggestion.length;

    setInput(newInput); // Replace entire input with suggestion
    setSuggestions([]); // Clear suggestions
    setSelectedIndex(-1);
    
    // Focus the input and set cursor position at the end
    if (inputRef.current) {
        inputRef.current.focus();
        //const newPosition = charCount - (lines[currentLineIndex].length - suggestion.length);
        setTimeout(() => {
            inputRef.current.selectionStart = newCursorPosition;
            inputRef.current.selectionEnd = newCursorPosition;
        }, 0);
    }
};

// Keyboard Controls - Handle Enter key, arrow keys, and suggestion selection

const handleKeyDown = (e) => {


        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            const newValue = input.slice(0, cursorPosition) + '\n' + input.slice(cursorPosition);
            setInput(newValue);
            setCursorPosition(cursorPosition + 1);
            setSuggestions([]); // Added this line to rest the suggestions
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.selectionStart = cursorPosition + 1;
                    inputRef.current.selectionEnd = cursorPosition + 1;
                }
                updateDropdownPosition();
            }, 0);
        } 
        
        else if (suggestions.length > 0) {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prevIndex => {
                        const newIndex = prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1;
// Update only current line with suggestion.
                        const lines = input.split('\n');
                        let currentLineIndex = 0;
                        let charCount = 0;
                        for (let i = 0; i < lines.length; i++) {
                            charCount += lines[i].length + 1; // +1 for the newline character
                            if (charCount > cursorPosition) {
                                currentLineIndex = i;
                                break;
                            }
                        }
                        lines[currentLineIndex] = suggestions[newIndex];
                        setInput(lines.join('\n'));
                        return newIndex;
                    });

                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prevIndex => {
                        const newIndex = prevIndex >= suggestions.length - 1 ? 0 : prevIndex + 1;
// Update only current line with suggestion.
                        const lines = input.split('\n');
                        let currentLineIndex = 0;
                        let charCount = 0;
                        for (let i = 0; i < lines.length; i++) {
                            charCount += lines[i].length + 1; // +1 for the newline character
                            if (charCount > cursorPosition) {
                                currentLineIndex = i;
                                break;
                            }
                        }
                        lines[currentLineIndex] = suggestions[newIndex];
                        setInput(lines.join('\n'));                   
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
        if (e.keyCode === 39) { // Right arrow key
            setInput(suggestion);
          }
    };

   

// Smart positioning - Calculate the position of the dropdown based on the cursor position
    const updateDropdownPosition = () => {
        
        // Gets information about where the text area is on the screen
        if (inputRef.current && containerRef.current) {
            const inputRect = inputRef.current.getBoundingClientRect();
        // Calculates where to put the suggestions box
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

// the visual part(render) - Render the textarea and suggestions dropdown
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
                id='search-bar'
                style={{ position: "relative", zIndex: 2 }}
                rows={1}
                // style={{ZIndex: 2}}
            />


            <input
                type="text"
                name="search-bar"
                id="search-bar-2"
                value={suggestion}
                readOnly
                style={{ height:"25px",width: "100%", zIndex: 2 }}
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