import React from 'react';
import '../styles/Note.css';
const Note = () => {
  return (
    <div className="note-container">
      <h2 className="note-title">Note </h2>
      <ul className="note-list">
        <li className="note-item">
          <span className="bullet"></span>
          <span className="note-text">
            All the Models have been optimized for writing medical prescriptions.
          </span>
        </li>
        <li className="note-item">
          <span className="bullet"></span>
          <span className="note-text">
            So, suggestion will be mostly related to medical terms.
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Note;