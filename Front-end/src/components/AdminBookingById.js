import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminBookingById = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/bookings/admin/${id}`)
      .then((res) => {
        console.log('Booking data:', res.data);
        setBooking(res.data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load booking details.');
        setBooking(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>
        Loading booking details...
      </div>
    );
  if (error)
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
        {error}
      </div>
    );
  if (!booking)
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        No booking found with ID {id}
      </div>
    );

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"

      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#e0e0e0',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#d5d5d5')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
      >
        Back
      </button>

      <h2
        style={{
          fontSize: '26px',
          fontWeight: 'bold',
          marginBottom: '25px',
          color: '#333',
        }}
      >
        Booking Details
      </h2>

      <ul
        style={{
          fontSize: '16px',
          lineHeight: '1.8',
          marginBottom: '30px',
          color: '#444',
          paddingLeft: '0',
          listStyleType: 'none',
        }}
      >
        <li>
          <strong>Tourist Name:</strong> {booking.touristName || 'N/A'}
        </li>
        <li>
          <strong>Tour Package:</strong> {booking.tourPackageName || 'N/A'}
        </li>
        <li>
          <strong>Season:</strong> {booking.seasonName || 'N/A'}
        </li>
        <li>
          <strong>Event:</strong> {booking.eventName || 'None'}
        </li>
        <li>
          <strong>Vehicle Packages:</strong>{' '}
          {booking.vehiclePackageNames?.join(', ') || 'None'}
        </li>
        <li>
          <strong>Passenger Count:</strong> {booking.passengerCount}
        </li>
        <li>
          <strong>Booking Date:</strong> {booking.bookingDate}
        </li>
        <li>
          <strong>Arrival Time:</strong> {booking.arrivalTime}
        </li>
        <li>
          <strong>Status:</strong> {booking.status}
        </li>
        {booking.cancelReason && (
          <li>
            <strong>Cancel Reason:</strong> {booking.cancelReason}
          </li>
        )}
        <li>
          <strong>Created At:</strong>{' '}
          {new Date(booking.createdAt).toLocaleString()}
        </li>
        <li>
          <strong>Total Cost:</strong> ${booking.overallTotalPrice}
        </li>
      </ul>

      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => navigate(`/bookings-accept/${id}`)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#219150')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#27ae60')}
        >
          Accept
        </button>

        <button
          onClick={() => navigate(`/bookings-reject/${id}`)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#c0392b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#a93226')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#c0392b')}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default AdminBookingById;
