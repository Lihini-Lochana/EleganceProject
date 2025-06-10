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
            navigate(`/view-cancel/${bookingId}`);
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
            margin: "50px auto",
            padding: "30px",
            backgroundColor: "#fdfdfd",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
            color: "#333"
        }}>
            <h2 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "bold", color: "#c0392b" }}>
                Cancel Booking #{bookingId}
            </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reason" style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                    Reason for Cancellation:
                </label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    rows="5"
                    placeholder="Enter your reason here..."
                    style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginBottom: "20px",
                        resize: "vertical"
                    }}
                ></textarea>
                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        backgroundColor: submitting ? "#aaa" : "#e74c3c",
                        color: "#fff",
                        padding: "12px 20px",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: submitting ? "not-allowed" : "pointer",
                        transition: "background-color 0.3s ease"
                    }}
                >
                    {submitting ? 'Cancelling...' : 'Submit Cancellation'}
                </button>
            </form>
        </div>
    );
};

export default CancelReasonForm;
