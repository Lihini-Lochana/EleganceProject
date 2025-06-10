import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GuideNotification = () => {
  const guideId = 3; 
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/notifications/guide/${guideId}`
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
        `http://localhost:8080/api/notifications/guide/${id}/mark-read`,
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
    return <div style={{ padding: "1rem", fontSize: "16px" }}>Loading notifications...</div>;

  if (error)
    return <div style={{ color: "red", padding: "1rem" }}>Error: {error}</div>;

  if (notifications.length === 0)
    return <div style={{ padding: "1rem", fontStyle: "italic" }}>No notifications at the moment.</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>
        Your Notifications
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notifications.map((notif) => (
          <li
            key={notif.id}
            style={{
              marginBottom: "1rem",
              cursor: notif.isRead ? "default" : "pointer",
              fontWeight: notif.isRead ? "normal" : "bold",
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "10px",
              backgroundColor: notif.isRead ? "#f4f4f4" : "#e6e6fc",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => {
              if (!notif.isRead) {
                markAsRead(notif.id);
              }
            }}
          >
            <div style={{ fontSize: "16px", marginBottom: "0.5rem" }}>
              <strong>Message:</strong> {notif.message}
            </div>

            <div style={{ fontSize: "14px", color: "#666" }}>
              {new Date(notif.timestamp).toLocaleString()} –{" "}
              {notif.read ? "Read" : "Unread"}
            </div>

            
           {notif.bookingId && (
                <div style={{ marginTop: "0.5rem" }}>
                    <Link to={`/booking-status-redirect/${notif.bookingId}`}>See More</Link>
                </div>
               )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuideNotification;
