import React from 'react';
import PropTypes from 'prop-types';
import './FareCalculator.css';
import { useNavigate } from 'react-router-dom';

const FareCalculator = ({ distance = 0, vehicle = {}, onBack, onRequest }) => {
  const navigate = useNavigate(); // Initialize navigate

  const formatCurrency = (amount) => {
    const num = typeof amount === 'number' ? amount : parseFloat(amount);
    return `Rs. ${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const totalFare = distance * vehicle.pricePerKm;

  const handleRequest = () => {
    onRequest({
      vehicle,
      distance,
      totalFare
    });
    navigate('/booking-form'); // Navigate to BookingForm after request
  };

  return (
    <div className="fare-calculator-container">
      <h3>Fare Details</h3>
      <div className="fare-details">
        <div className="fare-row">
          <span className="fare-label">Vehicle Type:</span>
          <span className="fare-value">{vehicle.name}</span>
        </div>
        <div className="fare-row">
          <span className="fare-label">Distance:</span>
          <span className="fare-value">{distance.toFixed(1)} km</span>
        </div>
        <div className="fare-row">
          <span className="fare-label">Rate:</span>
          <span className="fare-value">Rs. {vehicle.pricePerKm.toFixed(2)} per km</span>
        </div>
        <div className="fare-row total">
          <span className="fare-label">Total Fare:</span>
          <span className="fare-value">{formatCurrency(totalFare)}</span>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={onBack} className="action-button back">
          Back
        </button>
        <button className="action-button request" onClick={handleRequest}>
          Request Booking
        </button>
      </div>
    </div>
  );
};

FareCalculator.propTypes = {
  distance: PropTypes.number.isRequired,
  vehicle: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired
};

export default FareCalculator;
