package com.elegancetour.predesignedpackages.dto;

public class BookingCancelReasonDTO {
    private Long bookingId;
    private String cancelReason;

    public BookingCancelReasonDTO(Long bookingId, String cancelReason) {
        this.bookingId = bookingId;
        this.cancelReason = cancelReason;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public String getCancelReason() {
        return cancelReason;
    }
}
