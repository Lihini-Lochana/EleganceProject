import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CancelReasonForm = () => {
    const { bookingId } = useParams();
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.patch(`http://localhost:8080/api/bookings/${bookingId}/cancel`, null, {
                params: { reason },
            });
            alert("Booking cancelled successfully.");
            navigate(-1); 
        } catch (error) {
            console.error("Cancellation error:", error);
            alert("Failed to cancel booking. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{
            maxWidth: "600px",
            margin: "40px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
            <h2>Cancel Booking #{bookingId}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reason">Reason for Cancellation:</label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    rows="4"
                    style={{ width: "100%", padding: "10px", marginTop: "10px", marginBottom: "20px" }}
                ></textarea>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Cancelling...' : 'Submit Cancellation'}
                </button>
            </form>
        </div>
    );
};

export default CancelReasonForm;
