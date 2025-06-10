import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import placeService from "../services/PlaceService";
import "./AddPlace.css";

const AddPlace = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [isPickup, setIsPickup] = useState(false);
    const [isDrop, setIsDrop] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const placeData = {
            name: name,
            description: description,
            isPickup: isPickup,
            isDrop: isDrop,
            imageUrl: imageUrl,
        };

        try {
            await placeService.createPlace(placeData);
            navigate("/add-vehicle"); 
        } catch (error) {
            console.error("Error adding place:", error);
            alert("Failed to add place");
        }
    };

    return (
        <div className="add-place-container">
            <h2>Add New Place</h2>
            <form onSubmit={handleSubmit} className="add-place-form">
                <div className="form-group">
                    <label>Place Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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


               

                <button type="submit" className="submit-button-place">Save Place</button>
            </form>
        </div>
    );
};

export default AddPlace;
