import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewBookingResponse = () => {
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

  if (!booking || !response) return <p className="text-center mt-10">Loading booking response...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Booking Response for #{bookingId}</h2>

      <div className="mb-4">
        <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
        <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
        <p><strong>Passengers:</strong> {booking.passengerCount}</p>
        
      </div>

      <div className="mb-4">
        <p><strong>Status:</strong> {response.responseStatus}</p>
        {response.responseStatus === 'REJECTED' && (
          <p className="text-red-600"><strong>Rejection Reason:</strong> {response.rejectReason}</p>
        )}
        <p><strong>Responded Date:</strong> {new Date(response.respondedDate).toLocaleString()}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Assigned Guides:</h3>
        {response.guideIds && response.guideIds.length > 0 ? (
          <ul className="list-disc ml-5 mt-2">
            {response.guideIds.map((guideId, index) => (
              <li key={guideId}>
                <Link to={`/guides/${guideId}`} className="text-blue-600 underline hover:text-blue-800">
                  {response.guideNames[index]}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No guides assigned.</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Vehicle Assignments:</h3>
        {response.vehicleAssignments && response.vehicleAssignments.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {response.vehicleAssignments.map((va, idx) => (
              <li key={idx} className="border p-3 rounded">
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

export default ViewBookingResponse;
