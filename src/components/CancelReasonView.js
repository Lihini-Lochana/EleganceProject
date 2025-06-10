import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CancelReasonView = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [cancelReason, setCancelReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      setError('Invalid booking ID.');
      setLoading(false);
      return;
    }

    const fetchCancelReason = async () => {
      try {
        console.log("Fetching cancel reason for booking:", bookingId);
        const response = await axios.get(
          `http://localhost:8080/api/bookings/${bookingId}/get-cancel-reason`
        );
        console.log("Response data:", response.data);
        setCancelReason(response.data.cancelReason || 'No cancellation reason provided.');
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load cancellation reason.');
      } finally {
        setLoading(false);
      }
    };

    fetchCancelReason();
  }, [bookingId]);

  if (loading)
    return (
      <div style={{ padding: '1rem', fontSize: '16px', fontFamily: 'Segoe UI, sans-serif' }}>
        Loading cancellation reason...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          padding: '2rem',
          maxWidth: '600px',
          margin: '2rem auto',
          backgroundColor: '#fff3f3',
          border: '1px solid #ffcccc',
          borderRadius: '8px',
          fontFamily: 'Segoe UI, sans-serif',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'red', fontSize: '16px', marginBottom: '1rem' }}>{error}</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#fefefe',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
        Booking #{bookingId} - Cancelled
      </h2>
      <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#555' }}>
        Cancellation Reason:
      </p>
      <p
        style={{
          marginBottom: '1.5rem',
          whiteSpace: 'pre-wrap',
          color: '#444',
          lineHeight: '1.5',
        }}
      >
        {cancelReason}
      </p>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        Back
      </button>
    </div>
  );
};

export default CancelReasonView;
