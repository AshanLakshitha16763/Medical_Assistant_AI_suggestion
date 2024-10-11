// import React from 'react';
// import './SuggestionsDropdown.css';

// function SuggestionsDropdown({ suggestions,onClick }) {
//     return (
//         <div className="suggestions-dropdown">
//             {suggestions.map((suggestion, index) => (
//                 <div 
//                     key={index} 
//                     className="suggestion-item"
//                     onClick={() => onClick(suggestion)}
//                 >
//                     {suggestion}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default SuggestionsDropdown;


// import React from 'react';
// import './SuggestionsDropdown.css';

// function SuggestionsDropdown({ suggestions, onClick }) {
//     return (
//         <div className="suggestions-dropdown">
//             {suggestions.map((suggestion, index) => (
//                 <div 
//                     key={index} 
//                     className="suggestion-item"
//                     onClick={() => onClick(suggestion)}
//                 >
//                     {suggestion}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default SuggestionsDropdown;


// import React from 'react';
// import './SuggestionsDropdown.css';

// function SuggestionsDropdown({ suggestions, onClick }) {
//     return (
//         <div className="suggestions-dropdown">
//             {suggestions.map((suggestion, index) => (
//                 <div 
//                     key={index} 
//                     className="suggestion-item"
//                     onClick={() => onClick(suggestion)}
//                 >
//                     {suggestion}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default SuggestionsDropdown;

import React from 'react';
import './SuggestionsDropdown.css';


function SuggestionsDropdown({ suggestions,onClick, position }) {

    return (
        <div className="suggestions-dropdown"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
            {suggestions.map((suggestion, index) => (
                <div 
                    key={index} 
                    className="suggestion-item"
                    onClick={() => onClick(suggestion)}
                >
                    {suggestion}
                </div>
            ))}
        </div>
    );
}

export default SuggestionsDropdown;
