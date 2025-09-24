// Footer.jsx
import React from 'react';

const Footer = () => {
  const handleGetUpdates = () => {
    alert('Subscribing to updates!');
  };

  const handleViewEvents = () => {
    alert('Opening events calendar!');
  };

  return (
    <div className="footer-section">
      <div className="footer-card">
        <h3 className="footer-title">
          🇮🇳 Join Our Indian Food Truck Community!
        </h3>
        <p className="footer-description">
          Stay updated with regional specialties, festival menus, and authentic Indian food truck events in your area.
        </p>
        <div className="footer-buttons">
          <button 
            className="footer-button-primary"
            onClick={handleGetUpdates}
          >
            📧 Get Updates
          </button>
          <button 
            className="footer-button-secondary"
            onClick={handleViewEvents}
          >
            📅 View Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;