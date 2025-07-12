import React from 'react';
import PropTypes from 'prop-types';
import './VehicleOptions.css';

const VehicleOptions = ({ vehicles, passengerCount, onSelect }) => {
  const filteredVehicles = vehicles.filter(v => v.capacity >= passengerCount);

  return (
    <div className="vehicle-options-container">
      <h3>Select Vehicle Type</h3>
      {filteredVehicles.length === 0 ? (
        <div className="no-vehicles">
          No vehicles available for {passengerCount} passengers
        </div>
      ) : (
        <div className="vehicle-grid">
          {filteredVehicles.map(vehicle => (
            <div 
              key={vehicle.id}
              className="vehicle-card"
              onClick={() => onSelect(vehicle)}
            >
              {/* Add image container */}
              <div className="vehicle-image-container">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="vehicle-image"
                  onError={(e) => {
                    e.target.src = '/images/vehicle-placeholder.jpg'; // Fallback if image fails
                  }}
                />
              </div>
              <div className="vehicle-info">
                <div className="vehicle-name">{vehicle.name}</div>
                <div className="vehicle-price">Rs. {vehicle.pricePerKm} per km</div>
                <div className="vehicle-capacity">Max {vehicle.capacity} passengers</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

VehicleOptions.propTypes = {
  vehicles: PropTypes.array.isRequired,
  passengerCount: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default VehicleOptions;