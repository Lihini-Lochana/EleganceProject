import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBooking } from "../context/BookingContext";


const BookingForm = () => {
  const navigate = useNavigate();
  const { bookingData, updateBooking } =  useBooking();
  

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
    console.log('Navigated to booking page');
    console.log('Received tour package ID:', packageId);
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
    <div className="container mt-5">
      <h2>Booking Form</h2>

      <div className="mb-3">
        <strong>Overall Total Price:</strong> ${overallTotalPrice.toFixed(2)}
      </div>

      <form onSubmit={handleBookingSubmit}>
        <div className="mb-3">
          <label className="form-label">Passenger Count</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={passengerCount ?? ""}
            onChange={(e) => handlePassengerChange(e.target.value)}
            required
            />

            <input
            type="date"
            className="form-control"
            value={bookingDate ?? ""}
            onChange={(e) => handleDateChange(e.target.value)}
            required
            />

            <input
            type="time"
            className="form-control"
            value={arrivalTime ?? ""}
            onChange={(e) => handleTimeChange(e.target.value)}
            required
            />

        </div>

        <button type="submit" className="btn btn-primary">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
