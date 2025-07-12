import React, { useState, useRef, useCallback } from "react";
import { LoadScript, GoogleMap, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";
import VehicleOptions from "./VehicleOptions"; // Fixed import path
import FareCalculator from "./FareCalculator";
import "./DropService.css";


const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Colombo

// Moved vehicleTypes inside the component to avoid unused variable
const vehicleTypes = [
  { 
    id: 2, 
    name: "Sedan", 
    pricePerKm: 140, 
    capacity: 4,
    image: '/images/sedan.jpg'
  },
  { 
    id: 3, 
    name: "4-5 Seater", 
    pricePerKm: 160, 
    capacity: 5,
    image: '/images/van.jpg'
  },
  { 
    id: 4, 
    name: "KDH Flat Roof", 
    pricePerKm: 190, 
    capacity: 8,
    image: '/images/kdh-flat.jpg'
  },
  { 
    id: 5, 
    name: "KDH High Roof", 
    pricePerKm: 215, 
    capacity: 8,
    image: '/images/kdh-high.jpg'
  }
];

const DropService = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState(null);
  const [distanceInKm, setDistanceInKm] = useState(0);
  const [duration, setDuration] = useState(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showFareDetails, setShowFareDetails] = useState(false);

  const pickupAutocompleteRef = useRef(null);
  const dropAutocompleteRef = useRef(null);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const onLoad = (ref, type) => {
    if (type === "pickup") pickupAutocompleteRef.current = ref;
    else dropAutocompleteRef.current = ref;
  };

  const onPlaceChanged = (type) => {
    const ref = type === "pickup" ? pickupAutocompleteRef.current : dropAutocompleteRef.current;
    if (!ref) return;
    const place = ref.getPlace();
    if (!place.geometry || !place.formatted_address) return;

    type === "pickup" ? setPickup(place.formatted_address) : setDrop(place.formatted_address);
  };

  const calculateRoute = useCallback(async () => {
    if (!pickup || !drop) {
      setError("Please enter both pickup and drop locations.");
      return;
    }

    if (pickup === drop) {
      setError("Pickup and drop locations cannot be the same.");
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedVehicle(null);
    setShowFareDetails(false);

    try {
      const pickupPlace = pickupAutocompleteRef.current.getPlace();
      const dropPlace = dropAutocompleteRef.current.getPlace();

      if (!pickupPlace.geometry || !dropPlace.geometry) {
        throw new Error("Could not get coordinates for locations.");
      }

      const distanceService = new window.google.maps.DistanceMatrixService();
      const distanceResponse = await new Promise((resolve, reject) => {
        distanceService.getDistanceMatrix(
          {
            origins: [pickupPlace.geometry.location],
            destinations: [dropPlace.geometry.location],
            travelMode: "DRIVING",
            unitSystem: window.google.maps.UnitSystem.METRIC,
          },
          (response, status) => (status === "OK" ? resolve(response) : reject(status))
        );
      });

      const result = distanceResponse.rows[0].elements[0];
      if (result.status === "OK") {
        setDistance(result.distance.text);
        const kmValue = parseFloat(result.distance.text.replace(/[^\d.]/g, ''));
        setDistanceInKm(kmValue);
        setDuration(result.duration.text);
      } else {
        throw new Error(result.status);
      }

      const directionsService = new window.google.maps.DirectionsService();
      const directionsResult = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: pickupPlace.geometry.location,
            destination: dropPlace.geometry.location,
            travelMode: "DRIVING",
          },
          (result, status) => (status === "OK" ? resolve(result) : reject(status))
        );
      });

      setDirections(directionsResult);
    } catch (err) {
      setError(`Failed to calculate route: ${err.message}`);
      setDistance(null);
      setDistanceInKm(0);
      setDuration(null);
      setDirections(null);
    } finally {
      setLoading(false);
    }
  }, [pickup, drop]);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowFareDetails(true);
  };

  const handleClear = () => {
    setPickup("");
    setDrop("");
    setDistance(null);
    setDistanceInKm(0);
    setDuration(null);
    setDirections(null);
    setError(null);
    setPassengerCount(1);
    setSelectedVehicle(null);
    setShowFareDetails(false);
  };

  return (
    <div className="drop-service-container">
      <h2>Where is your journey?</h2>

      <div className="input-container">
        <div className="input-group">
          <label htmlFor="pickup">Pickup Location</label>
          <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            <Autocomplete onLoad={(ref) => onLoad(ref, "pickup")} onPlaceChanged={() => onPlaceChanged("pickup")}>
              <input
                id="pickup"
                type="text"
                placeholder="Enter pickup address"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="location-input"
              />
            </Autocomplete>
          </LoadScript>
        </div>

        <div className="input-group">
          <label htmlFor="drop">Drop Location</label>
          <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            <Autocomplete onLoad={(ref) => onLoad(ref, "drop")} onPlaceChanged={() => onPlaceChanged("drop")}>
              <input
                id="drop"
                type="text"
                placeholder="Enter drop address"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="location-input"
              />
            </Autocomplete>
          </LoadScript>
        </div>

        <div className="input-group">
          <label htmlFor="passengers">Passengers</label>
          <input
            id="passengers"
            type="number"
            min="1"
            max="20"
            value={passengerCount}
            onChange={(e) => setPassengerCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="location-input"
          />
        </div>

        <div className="button-group">
          <button onClick={calculateRoute} disabled={loading || !pickup || !drop} className="calculate-button">
            {loading ? "Calculating..." : "Calculate Route"}
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {(distance || duration) && (
        <div className="results-container">
          <div className="result-item">
            <span className="result-label">Distance:</span>
            <span className="result-value">{distance}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Duration:</span>
            <span className="result-value">{duration}</span>
          </div>
        </div>
      )}

      {distanceInKm > 0 && !showFareDetails && (
        <VehicleOptions
          vehicles={vehicleTypes}
          passengerCount={passengerCount}
          onSelect={handleVehicleSelect}
          selectedVehicle={selectedVehicle}
        />
      )}

      {showFareDetails && selectedVehicle && (
        <FareCalculator
          distance={distanceInKm}
          vehicle={selectedVehicle}
          onBack={() => setShowFareDetails(false)}
        />
      )}

      <div className="map-container">
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={directions ? 12 : 10} center={directions ? undefined : defaultCenter}>
            {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: "#1976D2", strokeWeight: 5 } }} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default DropService;