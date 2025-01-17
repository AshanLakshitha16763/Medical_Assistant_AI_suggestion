import React from 'react';
import '../styles/NewLineHint.css';

const NewLineHint = ({ selectedModel }) => {
    if (!selectedModel) return null;
    
    return (
        <div className="newline-hint">
            <div className="k_button">Shift</div>
                <span>+</span>
                <div className="k_button">Enter</div>
            <div className="key-combo">
                <span>Get New Line</span>
            </div>
        </div>
    );
};

export default NewLineHint;