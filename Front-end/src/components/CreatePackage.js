import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./CreatePackage.css"; 

const CreatePackage = () => {
  const { seasonId } = useParams();
  const navigate = useNavigate();

  const [packageName, setPackageName] = useState("");
  const [totalKilometers, setTotalKilometers] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [nights, setNights] = useState("");

  const [packagePlaces, setPackagePlaces] = useState([]);
  const [vehiclePackages, setVehiclePackages] = useState([]);

  const [allPlaces, setAllPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  const [durationNights, setDurationNights] = useState(1);

  const [vehicles, setVehicles] = useState({});
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [extraKmPrice, setExtraKmPrice] = useState("");

  const [placeDetails, setPlaceDetails] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/places")
      .then((res) => setAllPlaces(res.data))
      .catch((err) => console.error("Error fetching places:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/vehicles")
      .then((res) => {
        const map = {};
        res.data.forEach(v => {
          map[v.id] = v;
        });
        setVehicles(map);
      })
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, []);

  useEffect(() => {
    if (packagePlaces.length === 0) return;
    const ids = [...new Set(packagePlaces.map(p => p.placeId))];
    Promise.all(ids.map(id =>
      axios.get(`http://localhost:8080/api/places/${id}`)
    )).then(responses => {
      const map = {};
      responses.forEach(res => {
        map[res.data.id] = res.data;
      });
      setPlaceDetails(map);
    });
  }, [packagePlaces]);

  const handleAddPlace = () => {
    if (!selectedPlaceId || durationNights <= 0) {
      alert("Please select a place and valid nights.");
      return;
    }

    const assigned = packagePlaces.reduce((sum, p) => sum + p.durationNights, 0);
    if (assigned + parseInt(durationNights) > parseInt(nights)) {
      alert(`Assigned nights exceed total package nights (${nights})`);
      return;
    }

    setPackagePlaces([
      ...packagePlaces,
      {
        placeId: parseInt(selectedPlaceId),
        durationNights: parseInt(durationNights)
      }
    ]);

    setSelectedPlaceId("");
    setDurationNights(1);
  };

  const handleAddVehiclePackage = () => {
    if (!selectedVehicleId || !totalPrice || !extraKmPrice) {
      alert("Please provide all vehicle package details.");
      return;
    }

    setVehiclePackages([
      ...vehiclePackages,
      {
        vehicleId: parseInt(selectedVehicleId),
        totalPrice: parseFloat(totalPrice),
        extraKmPrice: parseFloat(extraKmPrice)
      }
    ]);

    setSelectedVehicleId("");
    setTotalPrice("");
    setExtraKmPrice("");
  };

  const handleSubmit = () => {
    if (!packageName || !pickupLocation || !dropLocation || !nights || !totalKilometers) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      name: packageName,
      nights: parseInt(nights),
      totalKilometers: parseInt(totalKilometers),
      pickupLocation,
      dropLocation,
      seasonId: parseInt(seasonId),
      packagePlaces: packagePlaces.map(p => ({
        placeId: p.placeId,
        durationNights: p.durationNights
      })),
      vehiclePackages: vehiclePackages.map(v => ({
        vehicleId: v.vehicleId,
        totalPrice: v.totalPrice,
        extraKmPrice: v.extraKmPrice
      }))
    };

    axios.post("http://localhost:8080/api/tour-packages", payload)
      .then(() => {
        alert("Tour package created successfully!");
        navigate("/admin/tour-packages");
      })
      .catch(err => {
        console.error("Error creating package:", err);
        alert("Failed to create package.");
      });
  };

  return (
    <div className="create-package-container">
      <h2>Create Tour Package</h2>

      <div className="form-group">
        <label>Package Name</label>
        <input value={packageName} onChange={(e) => setPackageName(e.target.value)} />

        <label>Pickup Location</label>
        <input value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />

        <label>Drop Location</label>
        <input value={dropLocation} onChange={(e) => setDropLocation(e.target.value)} />

        <label>Total Kilometers(km)</label>
        <input type="number" value={totalKilometers} onChange={(e) => setTotalKilometers(e.target.value)} />

        <label>Nights</label>
        <input type="number" value={nights} onChange={(e) => setNights(e.target.value)} />
      </div>


      <hr />
      <h3>Add Places</h3>
      <div className="form-group">
        <select value={selectedPlaceId} onChange={(e) => setSelectedPlaceId(e.target.value)}>
          <option value="">Select Place</option>
          {allPlaces.map((place) => (
            <option key={place.id} value={place.id}>{place.name}</option>
          ))}
        </select>
        <input type="number" min="1" value={durationNights} onChange={(e) => setDurationNights(e.target.value)} />
        <button onClick={handleAddPlace}>Add Place</button>
      </div>

      <ul className="list-group">
        {packagePlaces.map((p, index) => (
          <li key={index}>
            {placeDetails[p.placeId]?.name || `Place ID ${p.placeId}`} - {p.durationNights} nights
          </li>
        ))}
      </ul>

      <hr />
      <h3>Add Vehicle Packages</h3>
      <div className="form-group">
        <select value={selectedVehicleId} onChange={(e) => setSelectedVehicleId(e.target.value)}>
          <option value="">Select Vehicle</option>
          {Object.entries(vehicles).map(([id, v]) => (
            <option key={id} value={id}>{v.type}</option>
          ))}
        </select>
        <input placeholder="Total Price ($)" type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} />
        <input placeholder="Extra Km Price (LKR)" type="number" value={extraKmPrice} onChange={(e) => setExtraKmPrice(e.target.value)} />
        <button onClick={handleAddVehiclePackage}>Add Vehicle</button>
      </div>

      <ul className="list-group">
        {vehiclePackages.map((v, index) => (
          <li key={index}>
            {vehicles[v.vehicleId]?.type || `Vehicle ID ${v.vehicleId}`} - ${v.totalPrice} (Extra/km LKR{v.extraKmPrice})
          </li>
        ))}
      </ul>

      <hr />
      <button className="submit-btn" onClick={handleSubmit}>Submit Tour Package</button>
    </div>
  );
};

export default CreatePackage;
