package com.elegancetour.predesignedpackages.entity;

import jakarta.persistence.*;

@Entity
public class TouristNotification extends Notification {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tourist_id", nullable = false)
    private Tourist tourist;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "booking_response_id", nullable = true)
    private BookingResponse bookingResponse;

    public Tourist getTourist() {
        return tourist;
    }

    public void setTourist(Tourist tourist) {
        this.tourist = tourist;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public BookingResponse getBookingResponse() {
        return bookingResponse;
    }

    public void setBookingResponse(BookingResponse bookingResponse) {
        this.bookingResponse = bookingResponse;
    }
}


