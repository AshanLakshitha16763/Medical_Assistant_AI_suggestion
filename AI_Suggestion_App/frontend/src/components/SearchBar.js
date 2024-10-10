
// import axios from 'axios';
// import SuggestionsDropdown from './SuggestionsDropdown';
// import './SearchBar.css'; 
// import React, { useState, useEffect } from 'react';




// function SearchBar() {
//     const [input, setInput] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [placeholder, setPlaceholder] = useState("Loading prompt...");

//     useEffect(() => {
//         const fetchPlaceholder = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:5000/get-first-prompt');
//                 const firstPrompt = response.data.prompt;
//                 setPlaceholder(firstPrompt || "Type something here...");
//             } catch (error) {
//                 console.error("Error fetching placeholder prompt:", error);
//                 setPlaceholder("Type something here...");
//             }
//         };

//         fetchPlaceholder();
//     }, []);

//     const handleChange = async (e) => {
//         const value = e.target.value;
//         setInput(value);

//         if (value.length > 0) {
//             try {
//                 const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
//                 setSuggestions(response.data.suggestions);
//             } catch (error) {
//                 console.error("Error fetching suggestions:", error);
//             }
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setInput(suggestion);
//         setSuggestions([]); // Clear suggestions after selection
//     };

//     return (
//         <div className="search-bar-container">
//             <input
//                 type="text"
//                 value={input}
//                 onChange={handleChange}
//                 placeholder="Type something here..."
//                 className="search-bar"
//             />
//             {suggestions.length > 0 && (
//                 <SuggestionsDropdown suggestions={suggestions} onClick={handleSuggestionClick} />
//             )}
//         </div>
//     );
// }

// export default SearchBar;


// import React, { useState, useEffect } from 'react';  // Add useEffect here
// import axios from 'axios';
// import SuggestionsDropdown from './SuggestionsDropdown';
// import './SearchBar.css'; 

// function SearchBar() {
//     const [input, setInput] = useState("");             // State for the input field
//     const [suggestions, setSuggestions] = useState([]); // State for suggestions
//     const [placeholder, setPlaceholder] = useState("Loading prompt..."); // State for the placeholder

//     // Fetch placeholder on mount
//     useEffect(() => {
//         const fetchPlaceholder = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:5000/get-first-prompt');
//                 const firstPrompt = response.data.prompt;
//                 setPlaceholder(firstPrompt || "Type something here...");
//             } catch (error) {
//                 console.error("Error fetching placeholder prompt:", error);
//                 setPlaceholder("Type something here...");
//             }
//         };

//         fetchPlaceholder();
//     }, []);

//     // Fetch suggestions as the user types
//     const handleChange = async (e) => {
//         const value = e.target.value;
//         setInput(value);

//         if (value.length > 0) {
//             try {
//                 const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
//                 setSuggestions(response.data.suggestions);
//             } catch (error) {
//                 console.error("Error fetching suggestions:", error);
//             }
//         } else {
//             setSuggestions([]);
//         }
//     };

//     // When a suggestion is clicked, set the input value and clear suggestions
//     const handleSuggestionClick = (suggestion) => {
//         setInput(suggestion);
//         setSuggestions([]);
//     };

//     return (
//         <div className="search-bar-container">
//             <input
//                 type="text"
//                 value={input}
//                 onChange={handleChange}
//                 placeholder={placeholder}  // Dynamic placeholder from backend
//                 className="search-bar"
//             />
//             {suggestions.length > 0 && (
//                 <SuggestionsDropdown suggestions={suggestions} onClick={handleSuggestionClick} />
//             )}
//         </div>
//     );
// }

// export default SearchBar;


// import axios from 'axios';
// import SuggestionsDropdown from './SuggestionsDropdown';
// import './SearchBar.css'; 
// import React, { useState, useEffect } from 'react';

// function SearchBar() {
//     const [input, setInput] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [placeholder, setPlaceholder] = useState("Loading prompt...");

//     // Function to fetch the initial placeholder prompt
//     const fetchPlaceholder = async () => {
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
//         fetchPlaceholder();
//     }, []);

//     // Handle input changes and fetch suggestions
//     const handleChange = async (e) => {
//         const value = e.target.value;
//         setInput(value);

//         if (value.length > 0) {
//             try {
//                 const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
//                 const suggestionsList = response.data.suggestions;
//                 setSuggestions(suggestionsList);

//                 // Dynamically set the placeholder to the first suggestion
//                 if (suggestionsList.length > 0) {
//                     setPlaceholder(suggestionsList[0]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching suggestions:", error);
//             }
//         } else {
//             setSuggestions([]);
//             fetchPlaceholder(); // Reset placeholder if input is cleared
//         }
//     };

//     // Handle suggestion click
//     const handleSuggestionClick = (suggestion) => {
//         setInput(suggestion);
//         setSuggestions([]); // Clear suggestions after selection
//     };

//     return (
//         <div className="search-bar-container">
//             <input
//                 type="text"
//                 value={input}
//                 onChange={handleChange}
//                 placeholder={placeholder}
//                 className="search-bar"
//             />
//             {suggestions.length > 0 && (
//                 <SuggestionsDropdown suggestions={suggestions} onClick={handleSuggestionClick} />
//             )}
//         </div>
//     );
// }

// export default SearchBar;




import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css'; 
import React, { useState, useEffect } from 'react';

function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [placeholder, setPlaceholder] = useState("Loading prompt...");

    // Function to fetch the initial placeholder prompt
    const fetchInitialPlaceholder = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/get-first-prompt');
            const firstPrompt = response.data.prompt;
            setPlaceholder(firstPrompt || "Type something here...");
        } catch (error) {
            console.error("Error fetching placeholder prompt:", error);
            setPlaceholder("Type something here...");
        }
    };

    // Fetch the initial placeholder when the component mounts
    useEffect(() => {
        fetchInitialPlaceholder();
    }, []);

    // Handle input changes and fetch suggestions
    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);

        if (value.length > 0) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/suggest', { input: value });
                const suggestionsList = response.data.suggestions;
                setSuggestions(suggestionsList);

                // Dynamically set the placeholder to the first suggestion
                if (suggestionsList.length > 0) {
                    setPlaceholder(suggestionsList[0]); // Update placeholder to best suggestion
                } else {
                    setPlaceholder("Type something here..."); // Reset if no suggestions
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
            fetchInitialPlaceholder(); // Reset placeholder if input is cleared
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setSuggestions([]); // Clear suggestions after selection
        setPlaceholder(suggestion); // Set the placeholder to the selected suggestion
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder={placeholder} // Show best suggestion as placeholder
                className="search-bar"
            />
            {suggestions.length > 0 && (
                <SuggestionsDropdown suggestions={suggestions} onClick={handleSuggestionClick} />
            )}
        </div>
    );
}

export default SearchBar;
