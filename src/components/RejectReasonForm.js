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
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reject Booking #{bookingId}</h2>
      <form onSubmit={handleReject}>
        <label className="block mb-2 font-semibold" htmlFor="rejectReason">
          Rejection Reason
        </label>
        <textarea
          id="rejectReason"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter reason for rejection"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {loading ? 'Rejecting...' : 'Reject Booking'}
        </button>
      </form>
    </div>
  );
};

export default RejectReasonForm;
