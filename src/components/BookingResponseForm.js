import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingResponseForm = () => {
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

  if (!booking) return <p>Loading booking details…</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Accept Booking #{bookingId}</h2>

      <div className="mb-6">
        <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
        <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
        <p><strong>Passengers:</strong> {booking.passengerCount}</p>
        
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Assign Guides</label>
          <select
            multiple
            value={guideIds}
            onChange={onGuideChange}
            className="w-full border rounded p-2"
            required
          >
            {guides.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Enter Vehicle Numbers</h3>
          {vehicleAssignments.map((assign, pkgIdx) => (
            <div key={pkgIdx} className="mb-4 p-3 border rounded">
              <input type="hidden" value={assign.vehiclePackageId} />
              {assign.vehicleNumbers.map((num, numIdx) => (
                <input
                  key={numIdx}
                  type="text"
                  value={num}
                  onChange={(e) => onVehicleNumberChange(pkgIdx, numIdx, e.target.value)}
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Enter vehicle number"
                  required
                />
              ))}
              
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Confirm Accept
        </button>
      </form>
    </div>
  );
};

export default BookingResponseForm;
