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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Bookings</h2>

      <div className="flex gap-6 mb-6">
        <div>
          <label className="mr-2 font-semibold">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border px-3 py-1 rounded"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Filter by Created Date:</label>
          <input
            type="date"
            value={createdDateFilter}
            onChange={handleDateFilterChange}
            className="border px-3 py-1 rounded"
          />
        </div>
      </div>

      {filteredBookings.length === 0 && <p>No bookings found.</p>}

      {filteredBookings.map(booking => (
        <div key={booking.bookingId} className="border rounded p-4 mb-4 shadow">
          <h3 className="text-xl font-semibold mb-2">
            {booking.touristName} - {booking.tourPackageName} ({booking.seasonName})
          </h3>

          <ul className="text-sm mb-2">
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

          <div className="flex gap-4 mt-3">
            <button
              onClick={() => handleAccept(booking.bookingId)}
              disabled={booking.status !== 'PENDING'}
              className={`px-4 py-2 rounded text-white ${
                booking.status !== 'PENDING' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Accept
            </button>

            <button
              onClick={() => handleReject(booking.bookingId)}
              disabled={booking.status !== 'PENDING'}
              className={`px-4 py-2 rounded text-white ${
                booking.status !== 'PENDING' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
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
