import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBooking } from "../context/BookingContext";

const BookingForm = () => {
  const navigate = useNavigate();
  const { bookingData, updateBooking } = useBooking();

  const {
    seasonId,
    packageId,
    selectedVehiclePackageIds,
    selectedEventId,
    passengerCount,
    bookingDate,
    arrivalTime,
  } = bookingData;

  const touristId = 1;

  const [vehiclePackages, setVehiclePackages] = useState([]);
  const [event, setEvent] = useState(null);
  const [overallTotalPrice, setOverallTotalPrice] = useState(0.0);

  useEffect(() => {
    console.log("Navigated to booking page");
    console.log("Received tour package ID:", packageId);
  }, [packageId]);

  useEffect(() => {
    if (selectedVehiclePackageIds?.length > 0) {
      const vehicleCounts = {};
      selectedVehiclePackageIds.forEach((id) => {
        vehicleCounts[id] = (vehicleCounts[id] || 0) + 1;
      });

      const uniqueIds = Object.keys(vehicleCounts);

      axios
        .post("http://localhost:8080/api/vehicle-packages/by-ids", uniqueIds)
        .then((res) => {
          const expandedPackages = [];
          res.data.forEach((vp) => {
            const count = vehicleCounts[vp.id] || 1;
            for (let i = 0; i < count; i++) {
              expandedPackages.push({ ...vp });
            }
          });
          setVehiclePackages(expandedPackages);
        })
        .catch((err) => {
          console.error("Failed to fetch vehicle packages", err);
        });
    }
  }, [selectedVehiclePackageIds]);

  useEffect(() => {
    if (selectedEventId) {
      axios
        .get(`http://localhost:8080/api/events/selected/${selectedEventId}`)
        .then((res) => setEvent(res.data))
        .catch((err) => console.error("Failed to fetch event", err));
    }
  }, [selectedEventId]);

  useEffect(() => {
    if (vehiclePackages.length > 0) {
      const totalVehiclePrice = vehiclePackages.reduce(
        (sum, vp) => sum + vp.totalPrice,
        0
      );
      const eventPrice = event ? event.price : 0.0;
      setOverallTotalPrice(totalVehiclePrice + eventPrice);
    }
  }, [vehiclePackages, event]);

  const handlePassengerChange = (value) => {
    updateBooking({ passengerCount: parseInt(value) });
  };

  const handleDateChange = (value) => {
    updateBooking({ bookingDate: value });
  };

  const handleTimeChange = (value) => {
    updateBooking({ arrivalTime: value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const bookingDTO = {
      touristId,
      seasonId,
      selectedPackageId: packageId,
      selectedVehiclePackageIds,
      selectedEventId: selectedEventId || null,
      overallTotalPrice,
      passengerCount,
      bookingDate,
      arrivalTime,
    };

    console.log("Final BookingDTO payload:", bookingDTO);

    axios
      .post("http://localhost:8080/api/bookings", bookingDTO)
      .then(() => {
        alert("Booking successfully created!");
        navigate(`/tourist-bookings/${touristId}`);
      })
      .catch((err) => {
        console.error("Booking creation failed", err);
        alert("Booking creation failed!");
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#f2f6ff",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#8a85e9", marginBottom: "20px" }}>
          Let’s Get You Booked!
        </h2>

        <div
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#333",
            textAlign: "center",
          }}
        >
          Overall Total Price: ${overallTotalPrice.toFixed(2)}
        </div>

        <form onSubmit={handleBookingSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#333" }}>
              Passenger Count
            </label>
            <input
              type="number"
              style={inputStyle}
              min="1"
              value={passengerCount ?? ""}
              onChange={(e) => handlePassengerChange(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#333" }}>
              Booking Date
            </label>
            <input
              type="date"
              style={inputStyle}
              value={bookingDate ?? ""}
              onChange={(e) => handleDateChange(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#333" }}>
              Arrival Time
            </label>
            <input
              type="time"
              style={inputStyle}
              value={arrivalTime ?? ""}
              onChange={(e) => handleTimeChange(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#6c63ff",
  color: "#fdfcfc",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default BookingForm;
