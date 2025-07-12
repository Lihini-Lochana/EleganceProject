import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import seasonService from "../services/SeasonService";
import "./ViewSeason.css";
import { useBooking } from "../context/BookingContext"; 


export const ViewSeason = () => {
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();
    const { updateBooking } = useBooking(); 
    console.log("updateBooking:", updateBooking); 



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

    const handleSelectSeason = (seasonId) => {
        updateBooking({ seasonId }); 
        navigate(`/view-season-packages/${seasonId}`);
    };

    const backgroundStyle = {
        backgroundImage: `url('/assets/season-bg5.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '4rem 2rem',
        color: 'white',
        fontFamily: 'Segoe UI, sans-serif',
        textAlign: 'center'
};

        return (
        <div style={backgroundStyle}>
            <h1 className="season-header">Select season as your preference</h1>

            <div className="season-items-wrapper">
            {seasons.map((season) => (
                <div key={season.id} className="season-item">
                <button 
                    className="season-button" 
                    onClick={() => handleSelectSeason(season.id)}
                >
                    {season.name}
                </button>
                <p>{season.description}</p>
                </div>
            ))}
            </div>
        </div>
        );

};
