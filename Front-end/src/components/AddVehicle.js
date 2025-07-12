import React, { useState } from "react";
import vehicleService from "../services/VehicleService"; 
import { useNavigate } from "react-router-dom";
import "./AddVehicle.css"; 

const AddVehicle = () => {
    const [type, setType] = useState("");
    const [minPassengers, setMinPassengers] = useState("");
    const [maxPassengers, setMaxPassengers] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const vehicleData = {
            type: type,
            minPassengers: minPassengers,
            maxPassengers: maxPassengers,
            imageUrl: imageUrl,
        };

        try {
            await vehicleService.createVehicle(vehicleData);
            alert("Vehicle added successfully!");
      navigate(`/tourist-view-season`); 
        } catch (error) {
            console.error("Error adding vehicle:", error);
            alert("Failed to add vehicle");
        }
    };

    return (
        <div className="add-vehicle-form-container">
            <h2>Add New Vehicle</h2>
            <form onSubmit={handleSubmit} className="add-vehicle-form">
                <div className="form-group">
                    <label>Vehicle Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Min Passengers</label>
                    <input
                        type="number"
                        value={minPassengers}
                        onChange={(e) => setMinPassengers(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Max Passengers</label>
                    <input
                        type="number"
                        value={maxPassengers}
                        onChange={(e) => setMaxPassengers(e.target.value)}
                        required
                    />
                </div>


                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageUrl(e.target.files[0])}
                    />
                </div>


                <button type="submit" className="submit-button-vehicle">
                    Save Vehicle
                </button>
            </form>
        </div>
    );
};

export default AddVehicle;
