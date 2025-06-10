import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [createdDateFilter, setCreatedDateFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings/admin')
      .then(res => {
        setBookings(res.data);
        setFilteredBookings(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    if (createdDateFilter) {
      filtered = filtered.filter(b => {
        const createdDate = new Date(b.createdAt).toISOString().split('T')[0];
        return createdDate === createdDateFilter;
      });
    }

    setFilteredBookings(filtered);
  }, [statusFilter, createdDateFilter, bookings]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setCreatedDateFilter(e.target.value);
  };

  const handleAccept = (bookingId) => {
    navigate(`/bookings-accept/${bookingId}`);
  };

  const handleReject = (bookingId) => {
    navigate(`/bookings-reject/${bookingId}`);
  };

  const containerStyle = {
    padding: '24px',
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    backgroundColor: '#c5d0e4',
    minHeight: '100vh'
  };

  const headingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '24px'
  };

  const filterContainerStyle = {
    display: 'flex',
    gap: '24px',
    marginBottom: '24px'
  };

  const labelStyle = {
    fontWeight: '600',
    marginRight: '8px'
  };

  const inputStyle = {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '12px'
  };

  const listStyle = {
    fontSize: '14px',
    marginBottom: '12px',
    lineHeight: '1.6'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '16px',
    marginTop: '12px'
  };

  const buttonStyle = (bgColor, disabled) => ({
    padding: '10px 20px',
    borderRadius: '6px',
    color: 'white',
    backgroundColor: disabled ? '#aaa' : bgColor,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer'
  });

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>All Bookings</h2>

      <div style={filterContainerStyle}>
        <div>
          <label style={labelStyle}>Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            style={inputStyle}
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Filter by Created Date:</label>
          <input
            type="date"
            value={createdDateFilter}
            onChange={handleDateFilterChange}
            style={inputStyle}
          />
        </div>
      </div>

      {filteredBookings.length === 0 && <p>No bookings found.</p>}

      {filteredBookings.map(booking => (
        <div key={booking.bookingId} style={cardStyle}>
          <h3 style={titleStyle}>
            {booking.touristName} - {booking.tourPackageName} ({booking.seasonName})
          </h3>

          <ul style={listStyle}>
            <li><strong>Event:</strong> {booking.eventName || 'None'}</li>
            <li><strong>Vehicle Packages:</strong> {booking.vehiclePackageNames?.join(', ')}</li>
            <li><strong>Passenger Count:</strong> {booking.passengerCount}</li>
            <li><strong>Booking Date:</strong> {booking.bookingDate}</li>
            <li><strong>Arrival Time:</strong> {booking.arrivalTime}</li>
            <li><strong>Status:</strong> {booking.status}</li>
            {booking.cancelReason && (
              <li><strong>Cancel Reason:</strong> {booking.cancelReason}</li>
            )}
            <li><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</li>
            <li><strong>Total Cost:</strong> ${booking.overallTotalPrice}</li>
          </ul>

          <div style={buttonContainerStyle}>
            <button
              onClick={() => handleAccept(booking.bookingId)}
              disabled={booking.status !== 'PENDING'}
              style={buttonStyle('#28a745', booking.status !== 'PENDING')}
            >
              Accept
            </button>

            <button
              onClick={() => handleReject(booking.bookingId)}
              disabled={booking.status !== 'PENDING'}
              style={buttonStyle('#dc3545', booking.status !== 'PENDING')}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminBooking;
