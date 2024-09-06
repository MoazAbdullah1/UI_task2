import React, { useState } from 'react';
import './Datapage.css';

function Datapage() {
  const [selectedAction, setSelectedAction] = useState('');
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLoad = () => {
    if (file) {
      console.log('File loaded:', file.name);
      setShowSuccessMessage(true);
      setErrorMessage('');
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } else {
      setErrorMessage('Please select a file before uploading.');
    }
    setShowPopup(false);
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    setSelectedAction(action);

    if (action) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleRetrieveClick = () => {
    setActionMessage('Clicked on Retrieved PIM data!');
  };

  const handleDeleteClick = () => {
    setActionMessage('Clicked on Deleted PIM data!');
  };

  return (
    <div className="container">
      <div>
        
        <div className="dropdown-container">
          <select onChange={handleActionChange} value={selectedAction} className="dropdown">
            <option value="">Upload PIM data</option>
            <option value="ADD">ADD Items file</option>
            <option value="Update">UPDATE Items file</option>
          </select>
        </div>

        <div className="button-group">
          <button className="action-button" aria-label="Retrieve PIM data" onClick={handleRetrieveClick}>
            Retrieve PIM data ▶
          </button>
          <button className="action-button" aria-label="Delete PIM data" style={{ marginLeft: '10px' }} onClick={handleDeleteClick}>
            Delete PIM data ▶
          </button>
        </div>

        {showPopup && (
          <div className="popup">
            <h3>{selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)} Item Files</h3>
            <label htmlFor="fileInput" className="label">Choose a file</label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            <button onClick={handleLoad} className="load-button">
              {selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)} File
            </button>
          </div>
        )}

        <div className="message-box">
          <p>Message</p>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Write your message here..."
            className="message-input"
          />
        </div>

        {showSuccessMessage && (
          <div className="success-message">
            File {selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)} successfully!
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {actionMessage && (
          <div className="action-message">
            {actionMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Datapage;
