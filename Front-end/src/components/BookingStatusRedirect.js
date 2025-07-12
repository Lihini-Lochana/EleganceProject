import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookingStatusRedirect = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}/notification`);
        if (!response.ok) throw new Error("Failed to fetch booking");

        const booking = await response.json();
        console.log("Booking from backend:", booking);


        if (booking.booking.status === "REJECTED") {
        navigate(`/view-reject/${bookingId}`, { replace: true });
        } else if (booking.booking.status === "ACCEPTED") {
        navigate(`/view-accept/${bookingId}`, { replace: true });
        }else if (booking.booking.status === "PENDING") {
          navigate(`/booking-by-id/${bookingId}`, { replace: true });
        } else if (booking.booking.status === "CANCELLED") {
          navigate(`/view-cancel/${bookingId}`, { replace: true });
        } 
        else {
        navigate(`/booking-details/${bookingId}`, { replace: true });
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingStatus();
  }, [bookingId, navigate]);

  return <div>Loading booking information...</div>;
};

export default BookingStatusRedirect;
