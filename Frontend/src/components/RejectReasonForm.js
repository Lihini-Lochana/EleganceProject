import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RejectReasonForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReject = async (e) => {
    e.preventDefault();

    if (!rejectReason.trim()) {
      alert('Please enter a rejection reason.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/booking-responses/reject/${bookingId}`,
        null,
        { params: { rejectReason } }
      );

      alert('Booking rejected successfully.');
      navigate('/admin-bookings'); 
    } catch (error) {
      console.error('Failed to reject booking:', error);
      alert('Failed to reject booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"

      }}
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333'
        }}
      >
        Reject Booking #{bookingId}
      </h2>
      <form onSubmit={handleReject}>
        <label
          htmlFor="rejectReason"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#555'
          }}
        >
          Rejection Reason
        </label>
        <textarea
          id="rejectReason"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          placeholder="Enter reason for rejection"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? '#d9534f' : '#c0392b',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {loading ? 'Rejecting...' : 'Reject Booking'}
        </button>
      </form>
    </div>
  );
};

export default RejectReasonForm;
