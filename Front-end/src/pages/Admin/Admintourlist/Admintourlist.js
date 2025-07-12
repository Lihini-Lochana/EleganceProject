import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admintourlist.css";
import AdminNavbar from "../../../compornents/Adminnavbar";
import Adminsidebar from "../../../compornents/Adminsidebar";

const Admintourlist = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [guideName, setGuideName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [guidecontactNo, setGuidecontactNo] = useState("");

  const formRef = useRef(); // Correct: only used for the accept form

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bookings/tour/list")
      .then((response) => setTours(response.data))
      .catch((error) => console.error("Error fetching tours:", error));
  }, []);

  const handleReject = async (tour) => {
    try {
      await axios.post("http://localhost:8080/api/rejectbooking/tour/save", tour);
      alert("Tour Rejected and Saved Successfully");
      // Optionally remove the rejected tour from UI
      //setTours((prev) => prev.filter((t) => t !== tour));

      if (formRef.current) {
        formRef.current.style.display = "none";
      }
    } catch (error) {
      console.error("Error rejecting tour:", error);
      alert("Failed to reject tour");
    }
  };

  const openAcceptForm = (tour) => {
    setSelectedTour(tour);
    if (formRef.current) {
      formRef.current.style.display = "block";
    }
  };

  const handleAccept = async () => {
    if (!selectedTour || !guideName || !vehicleNo) {
      alert("Please fill in all required fields.");
      return;
    }

    const dataToSend = {
      name: selectedTour.name,
      email: selectedTour.email,
      contact_number: selectedTour.contact_number,
      vehicle: selectedTour.vehicle,
      date: selectedTour.date,
      time: selectedTour.time,
      cost: selectedTour.cost,
      places_names: selectedTour.places_names,
      guide_name: guideName,
      vehicle_number: vehicleNo,
      guidecontactNo:guidecontactNo,
    };

    try {
      await axios.post("http://localhost:8080/api/acceptbooking/tour/save", dataToSend);
      alert("Tour Accepted and Saved Successfully");

      if (formRef.current) {
        formRef.current.style.display = "none";
      }

      // Optionally remove accepted tour from list
     // setTours((prev) => prev.filter((t) => t !== selectedTour));
      setGuidecontactNo("");
      setGuideName("");
      setVehicleNo("");
      setSelectedTour(null);
    } catch (error) {
      console.error("Error accepting tour:", error);
      alert("Failed to accept tour");
    }
  };

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.style.display = "none";
    }
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
          <div
            className="card w-50 mb-3"
            key={index}
            style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.8)" }}
          >
            <div className="card-body">
              <h5 className="card-title">Tour Booking #{index + 1}</h5>
              <div className="card-text">
                <p><b>Email :</b> {tour.email}</p>
                <p><b>Name :</b> {tour.name}</p>
                <p><b>Contact Number :</b> {tour.contact_number}</p>
                <p><b>Selected Vehicle :</b> {tour.vehicle}</p>
                <p><b>Tour Date :</b> {tour.date}</p>
                <p><b>Tour Time :</b> {tour.time}</p>
                <p><b>Cost :</b> {tour.cost}</p>
                <p><b>Places :</b> {tour.places_names}</p>
                
              </div>
              <div className="row" style={{ marginLeft: "50%" }}>
                <div className="col">
                  <button
                    className="btn btn-success"
                    onClick={() => openAcceptForm(tour)}
                  >
                    Accept
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(tour)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accept Form */}
      <div className="acceptform" ref={formRef} style={{ display: "none" }}>
        <h2 style={{ marginLeft: "25%" }}>Accept Form</h2>
        <br />

        <div className="row">
          <div className="col-sm-5">
            <label><b>Guide Name</b></label>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={guideName}
              onChange={(e) => setGuideName(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-5">
            <label><b>Vehicle No:</b></label>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-5">
            <label><b>Guide Contact NO:</b></label>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={guidecontactNo}
              onChange={(e) => setGuidecontactNo(e.target.value)}
            />
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
