import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewPackage.css";


const ViewPackage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [tourPackage, setTourPackage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [places, setPlaces] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const fetchTourPackage = () => {
    axios
      .get(`http://localhost:8080/api/tour-packages/${packageId}`)
      .then((res) => {
        setTourPackage(res.data);
        fetchPlaceDetails(res.data.packagePlaces);
        fetchVehicleDetails(res.data.vehiclePackages);
      })
      .catch((err) => {
        setErrorMessage("Error fetching tour package.");
        console.error(err);
      });
  };

  const fetchPlaceDetails = (packagePlaces) => {
    const placePromises = packagePlaces.map((place) =>
      axios.get(`http://localhost:8080/api/places/${place.placeId}`)
    );

    Promise.all(placePromises)
      .then((responses) => {
        const fetchedPlaces = responses.map((res) => res.data);
        setPlaces(fetchedPlaces);
      })
      .catch((err) => {
        console.error("Error fetching place details", err);
      });
  };

  const fetchVehicleDetails = (vehiclePackages) => {
    const vehiclePromises = vehiclePackages.map((vehicle) =>
      axios.get(`http://localhost:8080/api/vehicles/${vehicle.vehicleId}`)
    );

    Promise.all(vehiclePromises)
      .then((responses) => {
        const fetchedVehicles = responses.map((res) => res.data);
        setVehicles(fetchedVehicles);
      })
      .catch((err) => {
        console.error("Error fetching vehicle details", err);
      });
  };

  useEffect(() => {
    fetchTourPackage();
  }, [packageId]);

  const deletePackagePlace = (id) => {
    axios
      .delete(`http://localhost:8080/api/package-places/${id}`)
      .then(() => {
        fetchTourPackage(); 
      })
      .catch((err) => {
        console.error("Error deleting package place", err);
      });
  };

  const deleteVehiclePackage = (id) => {
    axios
      .delete(`http://localhost:8080/api/vehicle-packages/${id}`)
      .then(() => {
        fetchTourPackage(); 
      })
      .catch((err) => {
        console.error("Error deleting vehicle package", err);
      });
  };

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!tourPackage || places.length === 0 || vehicles.length === 0) return <div>Loading...</div>;

  return (
    <div style={{fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"}}>
      <h2>Tour Package Details</h2>
      <div>
        
      </div>
      <div>
        <h3>{tourPackage.name}</h3>
        <p><strong>Total Kilometers:</strong> {tourPackage.totalKilometers} km</p>
        <p><strong>Pickup Location:</strong> {tourPackage.pickupLocation}</p>
        <p><strong>Drop Location:</strong> {tourPackage.dropLocation}</p>
        <p><strong>Duration (Nights):</strong> {tourPackage.nights}</p>
      </div>

      <div>
        <h4>Package Places</h4>
        {tourPackage.packagePlaces.length > 0 ? (
          tourPackage.packagePlaces.map((place, index) => (
            <div key={place.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <p><strong>Place:</strong> {places[index]?.name || "N/A"}</p>
              <p><strong>Nights:</strong> {place.durationNights}</p>
              <button onClick={() => deletePackagePlace(place.id)}>Delete Place</button>
            </div>
          ))
        ) : (
          <p>No package places added.</p>
        )}
      </div>

      <div>
        <h4>Vehicle Packages</h4>
        {tourPackage.vehiclePackages.length > 0 ? (
          tourPackage.vehiclePackages.map((vehicle, index) => (
            <div key={vehicle.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <p><strong>Vehicle:</strong> {vehicles[index]?.type || "N/A"}</p>
              <p><strong>Total Price ($):</strong> {vehicle.totalPrice}</p>
              <p><strong>Extra KM Price (LKR):</strong> {vehicle.extraKmPrice}</p>
              <button onClick={() => deleteVehiclePackage(vehicle.id)}>Delete Vehicle</button>
            </div>
          ))
        ) : (
          <p>No vehicle packages added.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPackage;
