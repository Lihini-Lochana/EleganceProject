import React, { useState , useEffect ,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaArrowLeft, FaTrash, FaEdit } from "react-icons/fa";
import "./admintouraccept.css";
import axios from "axios";
import AdminNavbar from "../../../compornents/Adminnavbar";
import Adminsidebar from "../../../compornents/Adminsidebar";

const AdmintourAccept = () => {
 
    const [tours, setTours] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/acceptbooking/tour/list')
          .then(response => {
            setTours(response.data);
          })
          .catch(error => {
            console.error("Error fetching vehicles:", error);
          });
      }, []);

      
     

  return (
    <div style={{backgroundColor:"#CCCCFF"}}>
      <Adminsidebar />
      <AdminNavbar />
    <div className="admintourlist_main" style={{marginTop:"5%",marginLeft:"10%"}}>
    {tours.map((tour, index) => (
      <div className="card w-50 mb-3" key={index} style={{boxShadow:" 0 4px 8px 0 rgba(0,0,0,0.8)"}}>
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
            <hr />
            <p><b>Guide Name :</b> {tour.guide_name}</p>
            <p><b>Vehicle Number :</b> {tour.vehicle_number}</p>
          </div>
         
        </div>
      </div>
    ))}
  </div>

     
     </div>
    
    
 
  );
};

export default AdmintourAccept;
