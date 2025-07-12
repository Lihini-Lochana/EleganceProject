import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RejectReasonView = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      setError('Invalid booking ID.');
      setLoading(false);
      return;
    }

    const fetchRejectReason = async () => {
      try {
        console.log("Fetching reason for booking:", bookingId);
        const response = await axios.get(
          `http://localhost:8080/api/booking-responses/${bookingId}`
        );
        console.log("Response data:", response.data);
        setRejectReason(response.data.rejectReason || 'No rejection reason provided.');
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load rejection reason.');
      } finally {
        setLoading(false);
      }
    };

    fetchRejectReason();
  }, [bookingId]);

  if (loading) return (
    <div style={{
      textAlign: "center",
      padding: "40px",
      fontSize: "18px",
      fontFamily: "Arial"
    }}>
      Loading rejection reason...
    </div>
  );

  if (error) {
    return (
      <div style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontFamily: "Arial"
      }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      color: "#333"
    }}>
      <h2 style={{
        fontSize: "24px",
        marginBottom: "20px",
        fontWeight: "bold",
        color: "#e74c3c"
      }}>
        Booking #{bookingId} - Rejected
      </h2>
      <p style={{
        fontWeight: "600",
        marginBottom: "10px",
        fontSize: "16px"
      }}>
        Rejection Reason:
      </p>
      <p style={{
        marginBottom: "30px",
        whiteSpace: "pre-wrap",
        backgroundColor: "#f9f9f9",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #ddd"
      }}>
        {rejectReason}
      </p>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#3498db",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
      >
        Back
      </button>
    </div>
  );
};

export default RejectReasonView;
