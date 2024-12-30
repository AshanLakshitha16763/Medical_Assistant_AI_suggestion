import React from 'react';
import './NewLineHint.css';

const NewLineHint = ({ selectedModel }) => {
    if (!selectedModel) return null;
    
    return (
        <div className="newline-hint">
            <k_button className="k_button">Shift</k_button>
                <span>+</span>
                <k_button className="k_button">Enter</k_button>
            <div className="key-combo">
                <span>Get New Line</span>
            </div>
        </div>
    );
};

export default NewLineHint;