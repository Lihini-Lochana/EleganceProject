import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./adminnavbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import image12 from "../images/newlogo.jpeg";

const DropNavbar = () => {
 

  return (
    <div>
        {/*<div className="navbar">
              <Link to="/Admintourdiscription"><span>Home</span></Link>
              <Link to="/Admintourlist"><span>All Booking of packages</span></Link>
              <Link to="/AdmintourAccept"><span>Accept List</span></Link>
              <Link to="/Admintourrejected"><span>Reject List</span></Link>
              <span>Canceled Booking</span>
            </div>
      */}

<nav class="navbar navbar-expand-lg" style={{backgroundColor: "#1174d8", position: "fixed", top: "0px", width: "100%", zIndex: "999", marginBottom:"200px"}}>
  <div class="container-fluid">
  <img src={image12} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight:"200px" }} alt="Logo" />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
      <Link to="/Admintourdiscription"><span>Home</span></Link>
      <Link to="/Admindropvehicle"><span>Add Vehicles</span></Link>
      <Link to="/Admindropitems"><span>Drop List</span></Link>
              <Link to="/AdmindropAccept"><span>Drop Accept</span></Link>
              <Link to="/Admindropreject"><span>Drop Reject</span></Link>
              <span>Canceled Booking</span>
      </div>
    </div>
  </div>
</nav>
    </div>
  );
};

export default DropNavbar;
