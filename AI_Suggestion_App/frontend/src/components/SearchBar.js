


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


import React, { useState, useRef } from 'react';
import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css';

function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [bestSuggestion, setBestSuggestion] = useState("");
    const inputRef = useRef(null);

    // Handle input changes and fetch suggestions
    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);

        if (value.length > 0) {
            try {
                // Fetch suggestions from the backend based on user input
                const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
                const suggestionsList = response.data.suggestions;
                setSuggestions(suggestionsList);

                // Set best suggestion from backend to display as a dynamic placeholder
                if (suggestionsList.length > 0) {
                    setBestSuggestion(suggestionsList[0]);
                } else {
                    setBestSuggestion(""); // Clear if no suggestions
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
            setBestSuggestion(""); // Reset best suggestion if input is cleared
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion); // Fill the input with the selected suggestion
        setSuggestions([]); // Clear suggestions after selection
        setBestSuggestion(""); // Clear the best suggestion
    };

    // Function to get the remaining part of the best suggestion not typed yet
    const getRemainingSuggestion = () => {
        if (bestSuggestion.toLowerCase().startsWith(input.toLowerCase())) {
            return bestSuggestion.slice(input.length); // Show the untyped part
        }
        return ""; // Return empty if no match
    };

    return (
        <div className="search-bar-container" style={{ position: "relative" }}>
            {/* Actual input where user types */}
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Type something here..." // Shows if input is empty
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
                />
            )}
        </div>
    );
}

export default SearchBar;
