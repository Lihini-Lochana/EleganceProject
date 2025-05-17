import React from "react";
import "./predesign.css";
import Sidebar from "../../compornents/Sidebar"

const PreDesigned = () => {
  const handlePreDesignedClick = () => {
    console.log("Pre-Designed Packages Clicked");
  };

  const handleTourPlanClick = () => {
    console.log("Tour Plan Clicked");
  };

  return (
    <div>
    <Sidebar />
    <div className="predesigned-container">
      <div className="p-button-description-container">
        {/* First Button & Description */}
        <div className="p-button-description-pair">
          <button className="p-custom-button" onClick={handlePreDesignedClick}>
            South Season
          </button>
          <div className="p-description-box">
            Guide Plans Places according to days and packages divided by season like South Season and Arugam Bay season.
          </div>
        </div>

        {/* Second Button & Description */}
        <div className="p-button-description-pair">
          <button className="p-custom-button" onClick={handleTourPlanClick}>
            Arugambe Season
          </button>
          <div className="p-description-box">
            Guide gives the day packages and you can customize places according to preferences.
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PreDesigned;