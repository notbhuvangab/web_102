// FoodTruckCard.jsx
import React from "react";
// import hyderabadi from "../assets/hyderabadi.jpg";

const FoodTruckCard = ({ truck }) => {
  const handleViewMenu = () => {
    alert(`Opening menu for ${truck.name}!`);
  };

  const handleGetDirections = () => {
    alert(`Getting directions to ${truck.name}!`);
  };

  const handleCall = () => {
    alert(`Calling ${truck.name}!`);
  };

  console.log(truck.image);
  return (
    <div className="food-truck-card">
      {/* Card Header */}
      <div className="card-header">
        <img src={truck.image}/>
        <h3 className="card-title">{truck.name}</h3>
        <span className="card-region-badge">{truck.region}</span>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <p className="card-description">{truck.description}</p>

        <div className="card-details">
          <div className="detail-row">
            <span className="detail-icon">📍</span>
            <span>{truck.location}</span>
          </div>

          <div className="detail-row">
            <span className="detail-icon">🕒</span>
            <span>{truck.hours}</span>
          </div>

          <div className="detail-row">
            <span className="detail-icon">⭐</span>
            <span>{truck.rating}/5.0 Rating</span>
          </div>

          <div className="detail-row">
            <span className="detail-icon">🍽️</span>
            <span className="specialty-name">{truck.speciality}</span>
          </div>

          {truck.dishes && (
            <div className="dishes-list">
              <span className="dishes-label">Also serves: </span>
              <span>{truck.dishes.join(", ")}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="card-actions">
          <button onClick={handleViewMenu} className="primary-button">
            View Menu
          </button>

          <div className="secondary-buttons">
            <button onClick={handleGetDirections} className="secondary-button">
              📍 Directions
            </button>
            <button onClick={handleCall} className="secondary-button">
              📞 Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodTruckCard;
