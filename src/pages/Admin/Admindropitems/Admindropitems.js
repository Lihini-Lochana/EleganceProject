import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admindropitem.css";
import AdminNavbar from "../../../compornents/Dropnavbar";
import Adminsidebar from "../../../compornents/Adminsidebar";
const Admintourlist = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [guideName, setGuideName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");

  const hide = useRef();

  useEffect(() => {
    axios.get("http://localhost:8080/api/drop-bookings/all")
      .then(response => setTours(response.data))
      .catch(error => console.error("Error fetching tours:", error));
  }, []);

  const handleReject = async (tour) => {
    try {
      await axios.post("http://localhost:8080/api/rejectdrop/tour/save", tour);
      alert("Tour Rejected and Saved Successfully");
    } catch (error) {
      console.error("Error rejecting tour:", error);
      alert("Failed to reject tour");
    }
  };

  const openAcceptForm = (tour) => {
    setSelectedTour(tour);
    hide.current.style.display = "block";
  };

  const handleAccept = async () => {
    if (!selectedTour || !guideName || !vehicleNo) {
      alert("Please fill in all required fields.");
      return;
    }

    const dataToSend = {
      name: selectedTour.name,
      email: selectedTour.email,
      dropLocation :selectedTour.dropLocation,
      picupLocation :selectedTour.pickupLocation,
      Drop_date: selectedTour.date,
      time: selectedTour.time,
      cost: selectedTour.totalCost,
      contact_number: selectedTour.contactNo,
      vehicle: selectedTour.vehicle,
      guide_name: guideName,
      vehicle_number: vehicleNo,
    };

    try {
      await axios.post("http://localhost:8080/api/admindropaccept/tour/save", dataToSend);
      alert("Tour Accepted and Saved Successfully");
      hide.current.style.display = "none";
      setGuideName("");
      setVehicleNo("");
      setSelectedTour(null);
    } catch (error) {
      console.error("Error accepting tour:", error);
      alert("Failed to accept tour");
    }
  };

  const handleCancel = () => {
    hide.current.style.display = "none";
    setSelectedTour(null);
    setGuideName("");
    setVehicleNo("");
  };

  return (
    <div style={{ backgroundColor: "#CCCCFF" }}>
        <Adminsidebar />
      <AdminNavbar />
      <div className="admintourlist_main" style={{marginTop:"5%",marginLeft:"10%"}}>
        {tours.map((tour, index) => (
          <div className="card w-50 mb-3" key={index} style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.8)" }}>
            <div className="card-body">
              <h5 className="card-title">Tour Booking #{index + 1}</h5>
              <div className="card-text">
                <p><b>Email :</b> {tour.email}</p>
                <p><b>Name :</b> {tour.name}</p>
                <p><b>Contact Number :</b> {tour.contactNo}</p>
                <p><b>Selected Vehicle :</b> {tour.vehicle}</p>
                <p><b>Drop Date :</b> {tour.date}</p>
                <p><b> Drop Location :</b> {tour.dropLocation}</p>
                <p><b>Picup location :</b> {tour.pickupLocation}</p>
                <p><b>Drop Aravell Time:</b> {tour.arrivalTime}</p>
                <p><b>Total Cost:</b> {tour.totalCost}</p>
                <p><b>distance:</b> {tour.distance}</p>
                
              </div>
              <div className="row" style={{ marginLeft: "50%" }}>
                <div className="col">
                  <button className="btn btn-success" onClick={() => openAcceptForm(tour)}>Accept</button>
                </div>
                <div className="col">
                  <button className="btn btn-danger" onClick={() => handleReject(tour)}>Reject</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accept Form */}
      <div className="acceptform" ref={hide}>
        <h2 style={{ marginLeft: "25%" }}>Accept Form</h2>
        <br />

        <div className="row">
          <div className="col-sm-5"><label><b>Guide Name</b></label></div>
          <div className="col-sm-7">
            <input type="text" className="form-control" value={guideName} onChange={(e) => setGuideName(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-5"><label><b>Vehicle No:</b></label></div>
          <div className="col-sm-7">
            <input type="text" className="form-control" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
          </div>
        </div>

        <div className="row" style={{ marginLeft: "60%", marginTop: "5%" }}>
          <div className="col">
            <button className="btn btn-success" onClick={handleAccept}>Accept</button>
          </div>
          <div className="col">
            <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admintourlist;
