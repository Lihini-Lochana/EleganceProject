import React, { useState, useEffect } from "react";
import "./notification.css";
import Sidebar from "../../compornents/Sidebar";

const Notifications = () => {
  const [dropBookings, setDropBookings] = useState([]);
  const [tourBookings, setTourBookings] = useState([]);
  const [dropExpandedId, setDropExpandedId] = useState(null);
  const [tourExpandedId, setTourExpandedId] = useState(null);
  const [dropError, setDropError] = useState("");
  const [tourError, setTourError] = useState("");

  const storedEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/admindropaccept/tour/find/${storedEmail}`);
        const data = await res.json();
        if (Array.isArray(data)) setDropBookings(data);
        else setDropError("No drop bookings found.");
      } catch {
        setDropError("Failed to fetch drop bookings.");
      }
    };
    fetchDrop();
  }, [storedEmail]);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/acceptbooking/tour/find/${storedEmail}`);
        const data = await res.json();
        if (Array.isArray(data)) setTourBookings(data);
        else setTourError("No tour bookings found.");
      } catch {
        setTourError("Failed to fetch tour bookings.");
      }
    };
    fetchTour();
  }, [storedEmail]);

  return (
    <div>
      <Sidebar />
    <div className="notification_main">
      <h1 className="page-title">Notifications</h1>

      <div className="notification-columns">
        {/* Drop Column */}
        <div className="category-section left-column">
          <h2 className="category-title"> Drop</h2>
          {dropError ? <p>{dropError}</p> : dropBookings.map((booking) => (
            <div
              key={booking.drop_acceptId}
              className="booking-card"
              onClick={() => setDropExpandedId(dropExpandedId === booking.drop_acceptId ? null : booking.drop_acceptId)}
            >
              <div className="summary">
                <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
                <p><strong>Drop:</strong> {booking.dropLocation}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.arrivalTime}</p>
              </div>
              {dropExpandedId === booking.drop_acceptId && (
                <div className="details">
                  <p><strong>Vehicle:</strong> {booking.vehicle}</p>
                  <p><strong>Passengers:</strong> {booking.passengerCount}</p>
                  <p><strong>Distance:</strong> {booking.distance}</p>
                  <p><strong>Total Cost:</strong> Rs. {booking.totalCost}</p>
                  <hr />
                  <p><strong>Driver Name:</strong> {booking.driverName}</p>
                  <p><strong>Vehicle Number:</strong> {booking.vehicleNumber}</p>
                  <p><strong>Contact Number:</strong> {booking.driverContact}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tour Column */}
        <div className="category-section right-column">
          <h2 className="category-title"> Tour</h2>
          {tourError ? <p>{tourError}</p> : tourBookings.map((booking) => (
            <div
              key={booking.tour_accept_id}
              className="booking-card"
              onClick={() => setTourExpandedId(tourExpandedId === booking.tour_accept_id ? null : booking.tour_accept_id)}
            >
              <div className="summary">
                <p><strong>Tour Name:</strong> {booking.tourname}</p>
                <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
              </div>
              {tourExpandedId === booking.tour_accept_id && (
                <div className="details">
                  <p><strong>Vehicle:</strong> {booking.vehicle}</p>
                  <p><strong>Passengers:</strong> {booking.passengerCount}</p>
                  <p><strong>Places:</strong> {booking.places_names}</p>
                  <p><strong>Total Cost:</strong> Rs. {booking.totalCost}</p>
                  <hr />
                  <p><strong>Guide Name:</strong> {booking.guide_name}</p>
                  <p><strong>Vehicle Number:</strong> {booking.vehicle_number}</p>
                  <p><strong>Guide Contact:</strong> {booking.guide_contact_number}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Notifications;








/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./notification.css";

const Notifications = () => {
  const navigate = useNavigate();

  // Dummy notifications data (replace with real data later)
  const [notifications] = useState({
    preDesigned: [
      { id: 1, title: "Katunayaka to Sigiriya", details: "Booked by John Doe" },
      
    ],
    tourPlan: [
      { id: 3, title: "Custom 3-Day Tour 🏝️ PreDesigned Package", details: "Booked by Michael Brown" },
      { id: 4, title: "Colombo City Tour 🏕️ Tour Plan", details: "Booked by Sarah White" },
    ],
  });

  // Navigate to Notification Details Page
  const handleNotificationClick = (category, notification) => {
    if (category === "preDesigned" && notification.id === 1) {
      navigate(`/DropNotification`, { state: { DropName: notification.title } });
    }

    if (category === "tourPlan" && notification.id === 4) {
      navigate(`/TourPlanNotification`, { state: { tourName: notification.title } });
    }
  };
  const storedEmail = localStorage.getItem("userEmail");
  return (
    <div className="notification_main">
    <div className="notifications-container">
      <h1 className="page-title">📢 Notifications</h1>
      <p>{storedEmail}</p>
     
      <div className="category-section">
        <h2 className="category-title">🌍 Drop</h2>
        <div className="notification-list">
          {notifications.preDesigned.map((notification) => (
            <div
              key={notification.id}
              className="notification-card clickable"
              onClick={() => handleNotificationClick("preDesigned", notification)}
            >
              <h3>{notification.title}</h3>
              <p>{notification.details}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="category-section">
        <h2 className="category-title">🗺️ Tour</h2>
        <div className="notification-list">
          {notifications.tourPlan.map((notification) => (
            <div
              key={notification.id}
              className="notification-card clickable"
              onClick={() => handleNotificationClick("tourPlan", notification)}
            >
              <h3>{notification.title}</h3>
              <p>{notification.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Notifications;
*/