import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import tourPackageService from '../services/TourPackageService';
import packagePlaceService from '../services/PackagePlaceService';
import placeService from '../services/PlaceService';
import './ViewPackageDetails.css';
import { useBooking } from '../context/BookingContext';

function ViewPackageDetails() {
  const { packageId } = useParams();
  const navigate = useNavigate(); 
  const [packageDetails, setPackageDetails] = useState(null);
  const [places, setPlaces] = useState([]);
  const [passengerCount, setPassengerCount] = useState('');
  const { updateBooking } = useBooking();

  useEffect(() => {
    console.log('Navigated to ViewPackageDetails page');
    console.log('Received tour package ID:', packageId);
  }, [packageId]);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const packageResponse = await tourPackageService.getTourPackageById(packageId);
        console.log('Fetched package details:', packageResponse.data);
        setPackageDetails(packageResponse.data);

        const placesResponse = await packagePlaceService.getPackagePlacesByTourPackageId(packageId);

        const placeDetails = await Promise.all(
          placesResponse.data.map(async (packagePlace, index) => {
            const placeResponse = await placeService.getPlaceById(packagePlace.placeId);
            return {
              ...placeResponse.data,
              number: index + 1,
              durationNights: packagePlace.durationNights
            };
          })
        );

        console.log('Fetched places for the package:', placeDetails);
        setPlaces(placeDetails);
      } catch (error) {
        console.error('Error fetching package details', error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  const handleNext = () => {
    if (passengerCount) {
      console.log('Passenger count entered:', passengerCount);
      updateBooking({ passengerCount: parseInt(passengerCount, 10) });
      navigate(`/vehicle-selection/${packageId}/${passengerCount}`);
    } else {
      alert('Please enter the number of passengers');
    }
  };

  return (
    <div className="package-details-container">
      {packageDetails ? (
        <div className="package-info">
          <h2>{packageDetails.name}</h2>
          <p><strong>Total Kilometers:</strong> {packageDetails.totalKilometers} km</p>
          <p><strong>Pickup Location:</strong> {packageDetails.pickupLocation}</p>
          <p><strong>Drop Location:</strong> {packageDetails.dropLocation}</p>
        </div>
      ) : (
        <p>Loading package details...</p>
      )}

      <div className="places-container">
        {places.length > 0 ? (
          places.map((place) => (
            <div key={place.id} className="place-card">
              <span className="place-number">{place.number}</span>
              <img 
                src={`http://localhost:8080${place.imageUrl}`} 
                alt={place.name} 
                className="place-image" 
                onError={(e) => { e.target.src = "/placeholder.jpg"; }} 
              />
              <h3>{place.name} - {place.durationNights} Night/s</h3>
              <p>{place.description}</p>
            </div>
          ))
        ) : (
          <p>No places added to this package.</p>
        )}
      </div>

      <div className="passenger-input-container">
        <label htmlFor="passengerCount">Number of Passengers:</label>
        <input
          type="number"
          id="passengerCount"
          value={passengerCount}
          onChange={(e) => setPassengerCount(e.target.value)}
          min="1"
        />
      </div>

      <div className="next-button-container">
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default ViewPackageDetails;
