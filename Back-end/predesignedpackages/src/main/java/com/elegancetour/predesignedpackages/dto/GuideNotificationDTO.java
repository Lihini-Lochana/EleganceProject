package com.elegancetour.predesignedpackages.dto;

import com.elegancetour.predesignedpackages.entity.GuideNotification;

import java.time.LocalDateTime;

public class GuideNotificationDTO {
    private Long id;
    private String message;
    private LocalDateTime timestamp;
    private boolean read;
    private Long guideId;

    private Long bookingId;
    private Long bookingResponseId;

    public GuideNotificationDTO() {}

    public GuideNotificationDTO(GuideNotification notification) {
        this.id = notification.getId();
        this.message = notification.getMessage();
        this.timestamp = notification.getTimestamp();
        this.read = notification.isRead();
        this.guideId = notification.getGuide() != null ? notification.getGuide().getId() : null;
        this.bookingId = notification.getBooking() != null ? notification.getBooking().getId() : null;
        this.bookingResponseId = notification.getBookingResponse() != null ? notification.getBookingResponse().getId() : null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public Long getGuideId() {
        return guideId;
    }

    public void setGuideId(Long guideId) {
        this.guideId = guideId;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public Long getBookingResponseId() {
        return bookingResponseId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public void setBookingResponseId(Long bookingResponseId) {
        this.bookingResponseId = bookingResponseId;
    }
}

