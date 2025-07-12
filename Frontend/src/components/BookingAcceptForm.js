import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingAcceptForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [guides, setGuides] = useState([]);
  const [guideIds, setGuideIds] = useState([]);
  const [vehicleAssignments, setVehicleAssignments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/bookings/${bookingId}`)
      .then(({ data }) => setBooking(data))
      .catch((err) => {
        console.error('Failed to load booking:', err);
        alert('Could not load booking details.');
      });

    axios
      .get(`http://localhost:8080/api/bookings/admin/${bookingId}/vehicle-packages`)
      .then(({ data }) => {
        const vehiclePkgIds = data.selectedVehiclePackageIds || [];
        const initialAssignments = vehiclePkgIds.map((pkgId) => ({
          vehiclePackageId: pkgId,
          vehicleNumbers: ['']
        }));
        setVehicleAssignments(initialAssignments);
      })
      .catch((err) => {
        console.error('Failed to load selected vehicle packages:', err);
        alert('Could not load selected vehicle package IDs.');
      });

    axios
      .get('http://localhost:8080/api/guides')
      .then(({ data }) => setGuides(data))
      .catch((err) => console.error('Failed to load guides:', err));
  }, [bookingId]);

  const onGuideChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
    setGuideIds(selected);
  };

  const onVehicleNumberChange = (pkgIdx, numIdx, value) => {
    setVehicleAssignments((prev) => {
      const copy = [...prev];
      copy[pkgIdx].vehicleNumbers[numIdx] = value;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      bookingId: Number(bookingId),
      guideIds,
      vehicleAssignments
    };

    axios
      .post('http://localhost:8080/api/booking-responses/accept', payload)
      .then(() => {
        alert('Booking accepted!');
        navigate('/admin-bookings');
      })
      .catch((err) => {
        console.error('Error accepting booking:', err);
        alert('Failed to accept booking.');
      });
  };

  if (!booking) return <p style={{ fontSize: '16px', textAlign: 'center' }}>Loading booking details…</p>;

  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '700px',
        margin: '20px auto',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"

      }}
    >
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '16px', color: '#2c3e50' }}>
        Accept Booking #{bookingId}
      </h2>

      <div style={{ marginBottom: '24px', lineHeight: '1.6' }}>
        <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
        <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
        <p><strong>Passengers:</strong> {booking.passengerCount}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Assign Guides</label>
          <select
            multiple
            value={guideIds}
            onChange={onGuideChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          >
            {guides.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontWeight: '600', marginBottom: '10px' }}>Enter Vehicle Numbers</h3>
          {vehicleAssignments.map((assign, pkgIdx) => (
            <div
              key={pkgIdx}
              style={{
                marginBottom: '16px',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <input type="hidden" value={assign.vehiclePackageId} />
              {assign.vehicleNumbers.map((num, numIdx) => (
                <input
                  key={numIdx}
                  type="text"
                  value={num}
                  required
                  placeholder="Enter vehicle number"
                  onChange={(e) => onVehicleNumberChange(pkgIdx, numIdx, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '14px'
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#8a85e9',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#8a85e9')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#8a85e9')}
        >
          Confirm Accept
        </button>
      </form>
    </div>
  );
};

export default BookingAcceptForm;
