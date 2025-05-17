import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './TouristBookings.css';

const TouristBookings = () => {
    const { touristId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/tourist/${touristId}`);
                setBookings(response.data);
                setFilteredBookings(response.data); 
                setLoading(false);
            } catch (err) {
                setError("Error fetching bookings");
                setLoading(false);
            }
        };

        fetchBookings();
    }, [touristId]);

    useEffect(() => {
        if (statusFilter === "ALL") {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter(booking => booking.status === statusFilter);
            setFilteredBookings(filtered);
        }
    }, [statusFilter, bookings]);

    const isPastDate = (dateString) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const bookingDate = new Date(dateString).setHours(0, 0, 0, 0);
        return bookingDate < today;
    };

    const handleCancel = (bookingId) => {
        navigate(`/cancel-booking/${bookingId}`);
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bookings-container">
            <h2>Your Bookings</h2>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="statusFilter">Filter by Status: </label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">All</option>
                    <option value="PENDING">Pending</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>

            {filteredBookings.length === 0 ? (
                <p>No bookings found for selected status.</p>
            ) : (
                <div className="booking-card-grid">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <h3>Booking #{booking.id}</h3>
                            <p><strong>Total Price:</strong> Rs. {booking.overallTotalPrice}</p>
                            <p><strong>Passengers:</strong> {booking.passengerCount}</p>
                            <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                            <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
                            <p><strong>Status:</strong> {booking.status}</p>
                            <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>

                            <button
                                className="cancel-button"
                                onClick={() => handleCancel(booking.id)}
                                disabled={isPastDate(booking.bookingDate) || booking.status === "CANCELLED"}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TouristBookings;
