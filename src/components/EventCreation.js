import React, { useState } from "react";
import axios from "axios";

const EventCreation = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setUploadStatus("Please choose an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post("http://localhost:8080/api/events/upload-event-image", formData);
      setEventData((prev) => ({
        ...prev,
        imageUrl: response.data,
      }));
      setUploadStatus("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      setUploadStatus("Failed to upload image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventData.imageUrl) {
      setUploadStatus("Please upload an image before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/events/create", eventData);
      setSuccessMessage("Event created successfully!");
      setEventData({ name: "", description: "", price: "", imageUrl: "" });
      setImageFile(null);
      setUploadStatus("");

    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to create event.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"}}>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" name="name" value={eventData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={eventData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image File:</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          <button type="button" onClick={handleImageUpload}>Upload Image</button>
          <p style={{ color: "blue" }}>{uploadStatus}</p>
        </div>
        {eventData.imageUrl && (
          <div>
            <img src={`http://localhost:8080${eventData.imageUrl}`} alt="Uploaded" width="200" />
          </div>
        )}
        <button type="submit">Create Event</button>
      </form>

      {successMessage && <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>}
    </div>
  );
};

export default EventCreation;
