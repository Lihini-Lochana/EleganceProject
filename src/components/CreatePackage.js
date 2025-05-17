import React, { useState } from "react";  
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PackagePlace from "./PackagePlace"; 
import VehiclePackage from "./VehiclePackage"; 

const CreatePackage = () => {
  const { seasonId } = useParams();
  const [packageName, setPackageName] = useState("");
  const [totalKilometers, setTotalKilometers] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [nights, setNights] = useState("");
  const [packagePlaces, setPackagePlaces] = useState([]);
  const [vehiclePackages, setVehiclePackages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");  

  const navigate = useNavigate();

  const handleSubmit = () => {
    const totalDuration = packagePlaces.reduce((total, place) => total + place.durationNights, 0);

    if (totalDuration > parseInt(nights)) {
      setErrorMessage(`Total duration of places (${totalDuration} nights) exceeds the package limit of ${nights} nights.`);
      return;
    }

    setErrorMessage("");

    const packageData = {
      name: packageName,
      nights: parseInt(nights),
      totalKilometers: parseInt(totalKilometers),
      pickupLocation,
      dropLocation,
      seasonId,
      packagePlaces,
      vehiclePackages,
    };

    axios
      .post("http://localhost:8080/api/tour-packages", packageData)
      .then((response) => {
        console.log("Package created successfully", response.data);
        navigate(`/view-package/${response.data.id}`);
      })
      .catch((error) => {
        console.error("There was an error creating the tour package!", error);
      });
  };

  return (
    <div>
      <h2>Create Tour Package</h2>
      <form>
        <div>
          <label>Package Name:</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
          />
        </div>
        <div>
          <label>Total Kilometers:</label>
          <input
            type="number"
            value={totalKilometers}
            onChange={(e) => setTotalKilometers(e.target.value)}
          />
        </div>
        <div>
          <label>Pickup Location:</label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Drop Location:</label>
          <input
            type="text"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Duration (Nights):</label>
          <input
            type="number"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
          />
        </div>

        <PackagePlace
          setPackagePlaces={setPackagePlaces}
          packagePlaces={packagePlaces}
          totalNights={nights}
        />


        <VehiclePackage
          setVehiclePackages={setVehiclePackages}
          vehiclePackages={vehiclePackages}
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 

        <div>
          <button type="button" onClick={handleSubmit}>
            Create Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePackage;
