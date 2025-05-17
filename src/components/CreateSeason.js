import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import seasonService from "../services/SeasonService";
import "./CreateSeason.css";

export const CreateSeason = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await seasonService.createSeason({ name, description });
            alert("Season created successfully!");
            navigate("/"); 
        } catch (error) {
            console.error("Error creating season:", error);
            alert("Failed to create season");
        }
    };

    return (
        <div className="create-season-container">
            <h2>Create Season</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Season Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                ></textarea>
                <button type="submit">Add Season</button>
            </form>
        </div>
    );
};
