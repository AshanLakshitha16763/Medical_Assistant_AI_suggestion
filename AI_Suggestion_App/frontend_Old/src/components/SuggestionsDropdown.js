
import React from 'react';
import './SuggestionsDropdown.css';

function SuggestionsDropdown({ suggestions, onClick, position, selectedIndex }) {
    return (
        <div className="suggestions-dropdown"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
        >
            {suggestions.map((suggestion, index) => (
                <div 
                    key={index}
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => onClick(suggestion)}
                >
                    {suggestion}
                </div>
            ))}
        </div>
    );
}

export default SuggestionsDropdown;
