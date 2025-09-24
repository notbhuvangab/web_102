import React from 'react';

const Header = () => {
  return (
    <div className="header-section">
      <div className="header-overlay"></div>
      <div className="header-content">
        {/* Decorative Awning */}
        <div className="awning-container">
          <div className="awning"></div>
        </div>
        
        <div className="header-text">
          <h1 className="main-title">
            🚚 Indian Regional Food Trucks 🇮🇳
          </h1>
          <p className="subtitle">
            Discover Authentic Regional Indian Cuisine
          </p>
          <p className="description">
            From Hyderabadi biryani to Kerala appam, explore diverse Indian flavors from every state!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;