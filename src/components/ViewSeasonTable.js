import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import seasonService from "../services/SeasonService";
import "./ViewSeasonTable.css";

export const ViewSeasonTable = () => {
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const response = await seasonService.getAllSeasons();
                setSeasons(response.data);
            } catch (error) {
                console.error("Error fetching seasons:", error);
            }
        };
        fetchSeasons();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this season?")) {
            try {
                await seasonService.deleteSeason(id);
                setSeasons(seasons.filter(season => season.id !== id));
            } catch (error) {
                console.error("Error deleting season:", error);
                alert("Failed to delete season");
            }
        }
    };

    return (
        <div className="season-view-container">
            <h2>Seasons</h2>
            <button className="create-button" onClick={() => navigate("/create-season")}>Create New Season</button>
            <table className="season-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {seasons.map((season) => (
                        <tr key={season.id}>
                            <td>{season.name}</td>
                            <td>{season.description}</td>
                            <td>
                                <button className="view-button" onClick={() => navigate(`/create-package/${season.id}`)}>Create Package</button>
                                <button className="delete-button" onClick={() => handleDelete(season.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
