import React, { useState , useEffect } from "react";
import "./dropbooking.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PreDesignBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("userEmail");

  // Props from previous page
  const { pickup, drop, distance, duration, passengerCount: defaultPassengerCount, vehicle, showFareDetails } = state || {};

  // Form state (editable fields)
  const [formData, setFormData] = useState({
    email: storedEmail||"",
    name: "",
    contactNo: "",
    date: "",
    arrivalTime: "",
    vehicle: vehicle || "",
    passengerCount: defaultPassengerCount || "",
    pickupLocation: pickup || "",
    dropLocation: drop || "",
    distance: distance || "",
    totalCost: showFareDetails || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleBooking = async () => {
    try {
      await axios.post("http://localhost:8080/api/drop-bookings/save", formData);
      alert("Booking successful!");
      navigate("/Bookingpending");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed! Please check console for details.");
    }
  };

  

  useEffect(() => {
    const fetchUserData = async () => {
      if (!formData.email) return;
  
      try {
        const response = await fetch(`http://localhost:8080/api/signup/getbyemail/${formData.email}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({
            ...prev,
            name: data.username,
            contactNo: data.contact_Number // Ensure this matches your form field
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [formData.email]);
  

  return (
    <div className="dropbooking-container">
      <div className="booking-card">
        <h2 className="title">Booking Details</h2>
        <div className="details">

          {/* Each input field */}
          {[
            { label: "Email", name: "email", type: "email", value: storedEmail },
            { label: "Name", name: "name", type: "text" },
            { label: "Contact No", name: "contactNo", type: "text" },
            { label: "Date", name: "date", type: "date" },
            { label: "Arrival Time", name: "arrivalTime", type: "time" },
            { label: "Your Vehicle", name: "vehicle", type: "text" },
            { label: "Passenger Count", name: "passengerCount", type: "number" },
            { label: "Pickup Location", name: "pickupLocation", type: "text" },
            { label: "Drop Location", name: "dropLocation", type: "text" },
            { label: "Distance", name: "distance", type: "text" },
            { label: "Total Cost", name: "totalCost", type: "text" },
          ].map(({ label, name, type }) => (
            <div className="row" key={name}>
              <div className="col-4"><span className="label">{label}</span></div>
              <div className="col-8">
                <input
                  type={type}
                  className="input"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ))}

        </div>

        <div className="book-buttons">
          <button className="book-btn" onClick={handleBooking}>Book</button>
          <button className="cancel-btn" onClick={() => navigate("/DropService")}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PreDesignBookingForm;
