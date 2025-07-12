import React, { useState , useEffect ,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaArrowLeft, FaTrash, FaEdit } from "react-icons/fa";

import axios from "axios";
import AdminNavbar from "../../../compornents/Dropnavbar";
import Adminsidebar from "../../../compornents/Adminsidebar"
const Admintourrejected = () => {
 
    const [tours, setTours] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/rejectdrop/tour/list')
          .then(response => {
            setTours(response.data);
          })
          .catch(error => {
            console.error("Error fetching vehicles:", error);
          });
      }, []);

      
     

  return (
    <div style={{backgroundColor:"#CCCCFF"}}>
        <Adminsidebar></Adminsidebar>
      <AdminNavbar />
    <div className="admintourlist_main" style={{marginTop:"5%",marginLeft:"10%"}}>
    {tours.map((tour, index) => (
      <div className="card w-50 mb-3" key={index} style={{boxShadow:" 0 4px 8px 0 rgba(0,0,0,0.8)"}}>
        <div className="card-body">
          <h5 className="card-title">Tour Booking #{index + 1}</h5>
          <div className="card-text">
            <p><b>Email :</b> {tour.email}</p>
            <p><b>Name :</b> {tour.name}</p>
            <p><b>Contact Number :</b> {tour.contactNo}</p>
            <p><b>Selected Vehicle :</b> {tour.vehicle}</p>
            <p><b>Pickup Location :</b> {tour.pickupLocation}</p>
            <p><b>Drop Location :</b> {tour.dropLocation}</p>
            <p><b>Tour Date :</b> {tour.date}</p>
            <p><b>Pacenger Count :</b> {tour.passengerCount}</p>
            <p><b>Tour Time :</b> {tour.arrivalTime}</p>
            <p><b>Cost :</b> {tour.totalCost}</p>
            <p><b>Places :</b> {tour.places_names}</p>
          </div>
         
        </div>
      </div>
    ))}
  </div>

     
     </div>
    
    
 
  );
};

export default Admintourrejected;
