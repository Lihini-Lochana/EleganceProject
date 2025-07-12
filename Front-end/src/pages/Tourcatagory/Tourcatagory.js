import React from "react";
import { useNavigate } from "react-router-dom";
import "./tourcatagory.css";
import Sidebar from "../../compornents/Sidebar"
const TourPackages = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handlePreDesignedClick = () => {
    navigate("/Predesign"); // Navigate to the new page
  };

  const handleTourPlanClick = () => {
    navigate("/Selectplaces"); // Navigate to tour plan page
  };

  return (
    <div>
        <Sidebar />
    <div className="tour-container">
      <div className="button-description-container">
        <div className="button-description-pair">
          <button className="custom-button" onClick={handlePreDesignedClick}>
            Pre-Designed Packages
          </button>
          <div className="description-box">
            Guide Plans Places according to days and packages divided by season like South Season and Arugam Bay season.
          </div>
        </div>

        <div className="button-description-pair">
          <button className="custom-button" onClick={handleTourPlanClick}>
            Tour Plan
          </button>
          <div className="description-box">
            Guide gives the day packages and you can customize places according to preferences.
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TourPackages;
