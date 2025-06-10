package com.elegancetour.predesignedpackages.dto;


import java.time.LocalDateTime;
import java.util.List;

public class BookingResponseDTO {

    private Long id;
    private Long bookingId;

    private List<Long> guideIds;
    private List<String> guideNames;

    private List<VehicleAssignmentDTO> vehicleAssignments;

    private String responseStatus;
    private String rejectReason;

    private LocalDateTime respondedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public List<Long> getGuideIds() {
        return guideIds;
    }

    public void setGuideIds(List<Long> guideIds) {
        this.guideIds = guideIds;
    }

    public List<String> getGuideNames() {
        return guideNames;
    }

    public void setGuideNames(List<String> guideNames) {
        this.guideNames = guideNames;
    }

    public List<VehicleAssignmentDTO> getVehicleAssignments() {
        return vehicleAssignments;
    }

    public void setVehicleAssignments(List<VehicleAssignmentDTO> vehicleAssignments) {
        this.vehicleAssignments = vehicleAssignments;
    }

    public String getResponseStatus() {
        return responseStatus;
    }

    public void setResponseStatus(String responseStatus) {
        this.responseStatus = responseStatus;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }

    public LocalDateTime getRespondedDate() {
        return respondedDate;
    }

    public void setRespondedDate(LocalDateTime respondedDate) {
        this.respondedDate = respondedDate;
    }
}

