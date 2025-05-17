import React, { useEffect, useState } from "react";
import axios from "axios";

const VehiclePackage = ({ setVehiclePackages, vehiclePackages }) => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [extraKmPrice, setExtraKmPrice] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState({}); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/vehicles")
      .then((res) => {
        const vehicles = res.data;
        setAllVehicles(vehicles);

        const vehicleRequests = vehicles.map((vehicle) =>
          axios.get(`http://localhost:8080/api/vehicles/${vehicle.id}`)
        );

        Promise.all(vehicleRequests)
          .then((responses) => {
            const vehicleDetailsMap = responses.reduce((acc, response) => {
              const vehicle = response.data;
              acc[vehicle.id] = vehicle; 
              return acc;
            }, {});
            setVehicleDetails(vehicleDetailsMap); 
          })
          .catch((err) => console.error("Error fetching vehicle details:", err));
      })
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, []);

  const handleAddVehicle = () => {
    if (!selectedVehicleId || !totalPrice || !extraKmPrice) {
      alert("Please fill in all vehicle details.");
      return;
    }

    const newVehicle = {
      vehicleId: parseInt(selectedVehicleId),
      totalPrice: parseFloat(totalPrice),
      extraKmPrice: parseFloat(extraKmPrice),
    };

    setVehiclePackages([...vehiclePackages, newVehicle]);
    setSelectedVehicleId("");
    setTotalPrice("");
    setExtraKmPrice("");
  };

  return (
    <div>
      <h3>Vehicle Packages</h3>

      <div>
        <label>Select Vehicle:</label>
        <select
          value={selectedVehicleId}
          onChange={(e) => setSelectedVehicleId(e.target.value)}
        >
          <option value="">-- Select a Vehicle --</option>
          {allVehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.type} 
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Total Price:</label>
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Extra Km Price:</label>
        <input
          type="number"
          value={extraKmPrice}
          onChange={(e) => setExtraKmPrice(e.target.value)}
        />
      </div>

      <button type="button" onClick={handleAddVehicle}>
        Add Vehicle
      </button>

      <ul>
        {vehiclePackages.map((v, i) => {
          const vehicle = vehicleDetails[v.vehicleId];
          return (
            <li key={i}>
              {vehicle ? (
                <>
                  <strong>{vehicle.type}</strong> - Price: {v.totalPrice}, Extra Km: {v.extraKmPrice}
                </>
              ) : (
                "Loading vehicle details..."
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VehiclePackage;
