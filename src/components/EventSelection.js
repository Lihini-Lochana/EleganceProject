import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBooking } from "../context/BookingContext"; 

const EventSelection = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { updateBooking } = useBooking(); 

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('Navigated to event selection page');
    console.log('Received tour package ID:', packageId);
  }, [packageId]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/events/all");
        setEvents(res.data);
      } catch (err) {
        setError("Failed to fetch events.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleNext = () => {
    updateBooking({ selectedEventId }); 

    navigate(`/booking-form/${packageId}`);
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="container">
      <h2>We have Village Tour and Safari Events</h2>
      <h2>Do you like these Events?</h2>
      <br></br>
      <h4><strong>You can skip this step if you don't want to attend any event.</strong></h4>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() =>
              setSelectedEventId((prevId) => (prevId === event.id ? null : event.id))
            }
            style={{
              border: selectedEventId === event.id ? "2px solid green" : "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "260px",
              cursor: "pointer",
            }}
          >
            <img
              src={`http://localhost:8080/api/events/images/${event.imageUrl?.split("/").pop()}`}
              alt={event.name}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h4>{event.name}</h4>
            <p>{event.description}</p>
            <p><strong>Price:</strong> Rs. {event.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default EventSelection;
