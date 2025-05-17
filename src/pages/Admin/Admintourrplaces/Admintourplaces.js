import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaArrowLeft, FaTrash } from "react-icons/fa";
import "./admintourplaces.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import AdminNavbar from "../../../compornents/Adminnavbar";
import Adminsidebar from "../../../compornents/Adminsidebar";

const AdminTourPlaceManagement = () => {
  const [places, setPlaces] = useState([]);
  const [tourplace_name, setTourplaceName] = useState("");
  const [tourplace_discription, setTourplaceDiscription] = useState("");
  const [tourplace_pic, setTourplacePic] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const tour_topicnumber = localStorage.getItem("selectedPackage");
  const tourname = localStorage.getItem("packagename");

  useEffect(() => {
    fetchTourPlaces();
  }, []);

  const fetchTourPlaces = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/tourplaces/add/${tour_topicnumber}`);
      setPlaces(res.data);
    } catch (err) {
      console.error("Error fetching tour places:", err);
    }
  };

  const handleImageChange = (e) => {
    setTourplacePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tourplace_name", tourplace_name);
    formData.append("tourplace_discription", tourplace_discription);
    formData.append("tour_topicnumber", tour_topicnumber);
    if (tourplace_pic) formData.append("tourplace_pic", tourplace_pic);

    try {
      if (isEditing) {
        const res = await axios.put(
          `http://localhost:8080/api/tourplaces/add/update/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Tour place updated successfully!");
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/tourplaces/add/save",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Tour place added successfully!");
      }

      
      fetchTourPlaces();

     
      setTourplaceName("");
      setTourplaceDiscription("");
      setTourplacePic(null);
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error("Error submitting tour place:", err);
      alert("Submission failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tourplaces/add/delete/${id}`);
      setPlaces(places.filter((place) => place.tourplace_id !== id));
      alert("Deleted successfully.");
    } catch (err) {
      console.error("Error deleting place:", err);
      alert("Deletion failed.");
    }
  };

  const handleEdit = (place) => {
    setIsEditing(true);
    setEditId(place.tourplace_id);
    setTourplaceName(place.tourplace_name);
    setTourplaceDiscription(place.tourplace_discription);
  };

  return (
    <div className="admin-container-flud">
      <Adminsidebar />
     <AdminNavbar />
      <div style={{marginLeft:"20%", marginTop:"10%"}}>
      <h4 className="header"><b>{tourname}</b></h4>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                value={tour_topicnumber}
                readOnly
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4"><label>Place Name</label></div>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                value={tourplace_name}
                onChange={(e) => setTourplaceName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4"><label>Description</label></div>
            <div className="col-sm-8">
              <textarea
                className="form-control"
                value={tourplace_discription}
                onChange={(e) => setTourplaceDiscription(e.target.value)}
                rows="5"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4"><label>Photo</label></div>
            <div className="col-sm-5">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button type="submit" className="btn-add"><FaPlus /></button>
            </div>
          </div>

          <button type="submit" className="adminvehicle_submit">
            {isEditing ? "Update" : "Create"}
          </button>
        </form>
      </div>

      <div className="vehicle-list">
        {places.map((place) => (
          <div key={place.tourplace_id} className="vehicle-card">
            <img
              src={`data:image/jpeg;base64,${place.tourplace_pic}`}
              alt="Place"
              className="vehicle-image"
            />
            <h5>{place.tourplace_name}</h5>
            <p>{place.tourplace_discription}</p>
            <div className="vehicle-buttons">
              <button className="btn-remove" onClick={() => handleDelete(place.tourplace_id)}>
                Delet
              </button>
              <button className="btn-edit" onClick={() => handleEdit(place)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/Admintourlist">
        <button className="btn-back">
          <FaArrowLeft />
        </button>
      </Link>
    </div>
    </div>
  );
};

export default AdminTourPlaceManagement;
