import React, { useEffect, useState } from "react";

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

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (notifications.length === 0) return <div>No notifications at the moment.</div>;

  return (
    <div>
      <h2>Your Notifications</h2>
      <ul>
        {notifications.map((notif) => (
          <li
            key={notif.id}
            style={{
              marginBottom: "1rem",
              cursor: notif.isRead ? "default" : "pointer",
              fontWeight: notif.isRead ? "normal" : "bold",
            }}
            onClick={() => {
              if (!notif.isRead) {
                markAsRead(notif.id);
              }
            }}
          >
            <div>
              <strong>Message:</strong> {notif.message}
            </div>
            <div>
              <small>
                {new Date(notif.timestamp).toLocaleString()} -{" "}
                {notif.read ? "Read" : "Unread"}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TouristNotification;
