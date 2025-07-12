import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TouristNotification = () => {
  const touristId = 1;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/notifications/tourist/${touristId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/notifications/tourist/${id}/mark-read`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading)
    return (
      <div style={{ fontFamily: 'Segoe UI, sans-serif', padding: '1rem' }}>
        Loading notifications...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          fontFamily: 'Segoe UI, sans-serif',
          color: "red",
          padding: "1rem",
        }}
      >
        Error: {error}
      </div>
    );

  if (notifications.length === 0)
    return (
      <div
        style={{
          fontFamily: 'Segoe UI, sans-serif',
          padding: "1.5rem",
          textAlign: "center",
          color: "#555",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          margin: "2rem auto",
          maxWidth: "600px",
        }}
      >
        No notifications at the moment.
      </div>
    );

  return (
    <div
      style={{
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#333",
          textAlign: "center",
        }}
      >
        Your Notifications
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notifications.map((notif) => {
          return (
            <li
              key={notif.id}
              style={{
                marginBottom: "1rem",
                cursor: notif.isRead ? "default" : "pointer",
                fontWeight: notif.isRead ? "normal" : "bold",
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "10px",
                backgroundColor: notif.isRead ? "#f9f9f9" : "#e6e6fc",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => {
                if (!notif.isRead) {
                  markAsRead(notif.id);
                }
              }}
            >
              <div style={{ marginBottom: "0.5rem", color: "#333" }}>
                <strong>Message:</strong> {notif.message}
              </div>
              <div style={{ fontSize: "13px", color: "#777" }}>
                {new Date(notif.timestamp).toLocaleString()} —{" "}
                {notif.read ? "Read" : "Unread"}
              </div>
              {notif.bookingId && (
                <div style={{ marginTop: "0.5rem" }}>
                  <Link
                    to={`/booking-status-redirect/${notif.bookingId}`}
                    style={{
                      fontSize: "14px",
                      color: "#007bff",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    See More 
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TouristNotification;
