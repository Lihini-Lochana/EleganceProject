package com.elegancetour.predesignedpackages.dto;

public class BookingWithResponseDTO {
    private BookingDTO booking;
    private BookingResponseDTO response;

    public BookingWithResponseDTO(BookingDTO booking, BookingResponseDTO response) {
        this.booking = booking;
        this.response = response;
    }

    public BookingDTO getBooking() {
        return booking;
    }

    public void setBooking(BookingDTO booking) {
        this.booking = booking;
    }

    public BookingResponseDTO getResponse() {
        return response;
    }

    public void setResponse(BookingResponseDTO response) {
        this.response = response;
    }
}
