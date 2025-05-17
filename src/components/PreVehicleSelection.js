import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBooking } from "../context/BookingContext";
import "./PreVehicleSelection.css"; 

const PreVehicleSelection = () => {
  const { packageId, passengerCount } = useParams();
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  const [vehiclePackages, setVehiclePackages] = useState([]);
  const [suggestedVehicles, setSuggestedVehicles] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [vehiclePackageCounts, setVehiclePackageCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (packageId && passengerCount) {
      updateBooking({
        packageId: Number(packageId),
        passengerCount: Number(passengerCount),
      });
    }

    const fetchData = async () => {
      try {
        const [packagesRes, suggestedRes, allVehiclesRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/vehicle-packages/tour-package/${packageId}`),
          axios.get(`http://localhost:8080/api/vehicle-packages/suggest-vehicles/${packageId}/${passengerCount}`),
          axios.get(`http://localhost:8080/api/vehicles`),
        ]);

        setVehiclePackages(packagesRes.data);
        setSuggestedVehicles(suggestedRes.data);
        setAllVehicles(allVehiclesRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch vehicle data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [packageId, passengerCount]);

  const mergedVehiclePackages = vehiclePackages.map((vp) => {
    const fullVehicle = allVehicles.find((v) => v.id === vp.vehicleId);
    return { ...vp, vehicle: fullVehicle };
  });

  const incrementCount = (vpId) => {
    setVehiclePackageCounts((prev) => {
      const newCounts = { ...prev, [vpId]: (prev[vpId] || 0) + 1 };
      calculateTotalPrice(newCounts);
      return newCounts;
    });
  };

  const decrementCount = (vpId) => {
    setVehiclePackageCounts((prev) => {
      if (!prev[vpId]) return prev;
      const updated = { ...prev, [vpId]: prev[vpId] - 1 };
      if (updated[vpId] <= 0) delete updated[vpId];
      calculateTotalPrice(updated);
      return updated;
    });
  };

  const calculateTotalPrice = (counts) => {
    let total = 0;
    for (const [vpId, count] of Object.entries(counts)) {
      const vehiclePackage = mergedVehiclePackages.find((vp) => vp.id === Number(vpId));
      if (vehiclePackage) {
        total += vehiclePackage.totalPrice * count;
      }
    }
    setTotalPrice(total);
  };

  const getSelectedVehiclePackageIds = () => {
    const ids = [];
    for (const [vpId, count] of Object.entries(vehiclePackageCounts)) {
      for (let i = 0; i < count; i++) {
        ids.push(Number(vpId));
      }
    }
    return ids;
  };

  const handleNextClick = () => {
    const selectedIds = getSelectedVehiclePackageIds();
    if (selectedIds.length === 0) {
      alert("Please select at least one vehicle package.");
      return;
    }

    updateBooking({
      selectedVehiclePackageIds: selectedIds,
    });

    navigate(`/event-selection/${packageId}`);
  };

  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="vehicle-selection-container">
      <h2>Suggested Vehicles for {passengerCount} Passengers</h2>
      <div className="horizontal-scroll">
        {suggestedVehicles.map((v, i) => (
          <div key={i} className="vehicle-card suggested">
            <h4>{v.type}</h4>
            <p>Capacity: {v.minPassengers} - {v.maxPassengers}</p>
            <img
              src={`http://localhost:8080${v.imageUrl}`}
              alt={v.type}
              onError={(e) => { e.target.src = "/placeholder.jpg"; }}
            />
          </div>
        ))}
      </div>

      <hr />

      <h2>Select Vehicles as your Preference</h2>
      <div className="horizontal-scroll">
        {mergedVehiclePackages.map((vp, i) => {
          const count = vehiclePackageCounts[vp.id] || 0;
          return (
            <div key={i} className="vehicle-card">
              <h4>{vp.vehicle?.type}</h4>
              <p>Max Passengers: {vp.vehicle?.maxPassengers}</p>
              <p>Total Price: ${vp.totalPrice}</p>
              <p>Extra Km Price: LKR {vp.extraKmPrice}</p>
              <img
                src={`http://localhost:8080${vp.vehicle?.imageUrl}`}
                alt={vp.vehicle?.type}
                onError={(e) => { e.target.src = "/placeholder.jpg"; }}
              />
              <div className="counter">
                <button onClick={() => decrementCount(vp.id)} disabled={count === 0}>−</button>
                <span>{count}</span>
                <button onClick={() => incrementCount(vp.id)}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      <h3>Total Price: ${totalPrice}</h3>

      <div className="next-button-container">
        <button onClick={handleNextClick} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default PreVehicleSelection;
