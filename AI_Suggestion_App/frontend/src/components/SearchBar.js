


// import React, { useState, useEffect ,useRef} from 'react';
// import axios from 'axios';
// import SuggestionsDropdown from './SuggestionsDropdown';
// import './SearchBar.css';

// function SearchBar() {
//     const [input, setInput] = useState("");
//     const [suggestions, setSuggestions] = useState([]);

//     const [placeholder, setPlaceholder] = useState("Loading prompt...");

//     const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
//     const inputRef = useRef(null);
// //    const [showDropdown, setShowDropdown] = useState(false);

//     // Function to fetch the initial placeholder prompt
//     const fetchInitialPlaceholder = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:5000/get-first-prompt');
//             const firstPrompt = response.data.prompt;
//             setPlaceholder(firstPrompt || "Type something here...");
//         } catch (error) {
//             console.error("Error fetching placeholder prompt:", error);
//             setPlaceholder("Type something here...");
//         }
//     };

//     // Fetch the initial placeholder when the component mounts
//     useEffect(() => {
//         setPlaceholder("Type something here...");
//         fetchInitialPlaceholder();
//     }, []);

//     // Handle input changes and fetch suggestions
//     const handleChange = async (e) => {
//         const value = e.target.value;
//         setInput(value);

//                                                                  // Get the text cursor position and set the dropdown position dynamically
//         const { top, left } = getCaretCoordinates(e.target);
//         setDropdownPosition({ top: top + 20, left:left + 5 }); 

//         if (value.length > 0) {
//             try {
//                 const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
//                 const suggestionsList = response.data.suggestions;
//                 setSuggestions(suggestionsList);

//                 // Dynamically set the placeholder to the first suggestion
//                 if (suggestionsList.length > 0) {
//                     setPlaceholder(suggestionsList[0]); // Update placeholder to best suggestion
//                 } else {
//                     setPlaceholder("Type something here..."); // Reset if no suggestions
//                 }

//                 setSuggestions(response.data.suggestions);


//             } catch (error) {
//                 console.error("Error fetching suggestions:", error);
//             }
//         } else {
//             setSuggestions([]);

//              // Reset placeholder if input is cleared
//             setPlaceholder("Type something here...");
//             fetchInitialPlaceholder();


//         }
//     };

//     // Handle suggestion click
//     const handleSuggestionClick = (suggestion) => {
//         setInput(suggestion);
//         setSuggestions([]); // Clear suggestions after selection
//         setPlaceholder(suggestion); // Set the placeholder to the selected suggestion


//     };

//                                                                         // Function to calculate the caret position within the input
//     const getCaretCoordinates = (element) => {
//         const rect = element.getBoundingClientRect();
//         const caretPos = element.selectionEnd;
//         const textBeforeCaret = element.value.substring(0, caretPos);
//         const textWidth = getTextWidth(textBeforeCaret, getComputedStyle(element));

//         return {
//             top: rect.top + window.scrollY,
//             left: rect.left + textWidth + window.scrollX
//         };
//     };

//                                                                                             //  to measure text width via Utility function
//     const getTextWidth = (text, style) => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         context.font = `${style.fontSize} ${style.fontFamily}`;
//         return context.measureText(text).width;
//     };

//     return (
//         <div className="search-bar-container">
//             <input
//                 ref={inputRef}
//                 type="text"
//                 value={input}
//                 onChange={handleChange}
//                 placeholder={placeholder} // Show best suggestion as placeholder
//                 className="search-bar"
//             />
//             {suggestions.length > 0 && (
//                 <SuggestionsDropdown suggestions={suggestions}onClick={handleSuggestionClick} 
//                 position={dropdownPosition}
//                 />
//             )}
//         </div>
//     );
// }

// export default SearchBar;


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
        setSelectedIndex(-1);
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
                    setSelectedIndex(prevIndex => 
                        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
                    );
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prevIndex => 
                        prevIndex >= suggestions.length - 1 ? 0 : prevIndex + 1
                    );
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
            
            {/* Fake overlay input to show the suggestion after the user input */}
            {input.length > 0 && bestSuggestion && (
                <div className="fake-placeholder-container" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
                    <span className="input-text-overlay">{input}</span>
                    <span className="input-suggestion-overlay">{getRemainingSuggestion()}</span>
                </div>
            )}
            
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
