import React, { useEffect, useState } from "react";
import axios from "axios";

const VehiclePackage = ({ vehiclePackages, setVehiclePackages }) => {
  const [vehicles, setVehicles] = useState({});
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [extraKmPrice, setExtraKmPrice] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/vehicles")
      .then((res) => {
        const vehicleMap = {};
        res.data.forEach((vehicle) => {
          vehicleMap[vehicle.id] = vehicle;
        });
        setVehicles(vehicleMap);
      })
      .catch((err) => {
        console.error("Error fetching vehicles", err);
      });
  }, []);

  const handleAddVehiclePackage = () => {
    if (!selectedVehicleId || !totalPrice || !extraKmPrice) return;

    const newPackage = {
      vehicleId: parseInt(selectedVehicleId),
      totalPrice: parseFloat(totalPrice),
      extraKmPrice: parseFloat(extraKmPrice),
    };

    const updatedPackages = [...(vehiclePackages || []), newPackage];
    setVehiclePackages(updatedPackages);

    setSelectedVehicleId("");
    setTotalPrice("");
    setExtraKmPrice("");
  };

  return (
    <div>
      <h3>Add Vehicle Package</h3>
      <div>
        <label>Vehicle Type:</label>
        <select
          value={selectedVehicleId}
          onChange={(e) => setSelectedVehicleId(e.target.value)}
        >
          <option value="">Select a vehicle</option>
          {Object.values(vehicles).map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.type} ({vehicle.minPassengers}-{vehicle.maxPassengers} pax)
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

      <button type="button" onClick={handleAddVehiclePackage}>
        Add Vehicle Package
      </button>

      <h4>Added Vehicle Packages</h4>
      {Array.isArray(vehiclePackages) && vehiclePackages.length === 0 ? (
        <p>No vehicle packages added yet.</p>
      ) : (
        <ul>
          {Array.isArray(vehiclePackages) &&
            vehiclePackages.map((vp, index) => {
              const vehicle = vehicles[vp.vehicleId];
              return (
                <li key={index} style={{ marginBottom: "1rem" }}>
                  {vehicle && (
                    <>
                      <p>
                        <strong>{vehicle.type}</strong> ({vehicle.minPassengers}-
                        {vehicle.maxPassengers} pax)
                      </p>
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.type}
                        width="150"
                      />
                    </>
                  )}
                  <p>Total Price: Rs. {vp.totalPrice}</p>
                  <p>Extra Km Price: Rs. {vp.extraKmPrice}</p>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default VehiclePackage;
