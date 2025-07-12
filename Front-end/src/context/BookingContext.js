import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
        seasonId: null,
        selectedPackageId: null,
        selectedVehiclePackageIds: [],
        selectedEventId: null,
        passengerCount: 1,
        bookingDate: "",
        arrivalTime: "",
  });

  const updateBooking = (newData) => {
    setBookingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
