import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewBookingAccept = () => {
  const { bookingId } = useParams();
  const [response, setResponse] = useState(null);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/bookings/${bookingId}`)
      .then(({ data }) => setBooking(data))
      .catch((err) => {
        console.error('Failed to load booking:', err);
        alert('Could not load booking details.');
      });

    axios.get(`http://localhost:8080/api/booking-responses/${bookingId}`)
      .then(({ data }) => setResponse(data))
      .catch((err) => {
        console.error('Failed to load booking response:', err);
        alert('Could not load booking response.');
      });
  }, [bookingId]);

  if (!booking || !response) {
    return (
      <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#333' }}>
        Loading booking response...
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '24px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",

        color: '#333'
      }}
    >
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px' }}>
        Booking Response for #{bookingId}
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
        <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
        <p><strong>Passengers:</strong> {booking.passengerCount}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>Status:</strong> {response.responseStatus}</p>
        {response.responseStatus === 'REJECTED' && (
          <p style={{ color: '#c0392b' }}><strong>Rejection Reason:</strong> {response.rejectReason}</p>
        )}
        <p><strong>Responded Date:</strong> {new Date(response.respondedDate).toLocaleString()}</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Assigned Guides:</h3>
        {response.guideIds && response.guideIds.length > 0 ? (
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
            {response.guideIds.map((guideId, index) => (
              <li key={guideId} style={{ marginBottom: '8px' }}>
                <Link
                  to={`/guides/${guideId}`}
                  style={{ color: '#007BFF', textDecoration: 'underline' }}
                >
                  {response.guideNames[index]}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No guides assigned.</p>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Vehicle Assignments:</h3>
        {response.vehicleAssignments && response.vehicleAssignments.length > 0 ? (
          <ul style={{ marginTop: '10px' }}>
            {response.vehicleAssignments.map((va, idx) => (
              <li
                key={idx}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: '#fff'
                }}
              >
                <p><strong>Vehicle Numbers:</strong> {va.vehicleNumbers.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No vehicles assigned.</p>
        )}
      </div>
    </div>
  );
};

export default ViewBookingAccept;
