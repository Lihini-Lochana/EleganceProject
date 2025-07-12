package com.elegancetour.predesignedpackages.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;

public class BookingDTO {

    private Long id;
    private Long touristId;
    private Long seasonId;
    private Long selectedPackageId;
    private Long selectedEventId;

    private List<Long> selectedVehiclePackageIds;

    private double overallTotalPrice;
    private int passengerCount;
    private LocalDate bookingDate;
    private LocalTime arrivalTime;
    private String status;

    private String cancelReason;

    private LocalDateTime createdAt;

    public BookingDTO() {}

    public BookingDTO(Long touristId, Long seasonId, Long selectedPackageId, Long selectedEventId, List<Long> selectedVehiclePackageIds,
                      int passengerCount, LocalDate bookingDate, LocalTime arrivalTime, LocalDateTime createdAt) {
        this.touristId = touristId;
        this.seasonId = seasonId;
        this.selectedPackageId = selectedPackageId;
        this.selectedEventId = selectedEventId;
        this.selectedVehiclePackageIds = selectedVehiclePackageIds;
        this.passengerCount = passengerCount;
        this.bookingDate = bookingDate;
        this.arrivalTime = arrivalTime;
        this.createdAt = createdAt;
    }

    public BookingDTO(Long id, double overallTotalPrice, int passengerCount,
                      LocalDate bookingDate, LocalTime arrivalTime, String status, LocalDateTime createdAt) {
        this.id = id;
        this.overallTotalPrice = overallTotalPrice;
        this.passengerCount = passengerCount;
        this.bookingDate = bookingDate;
        this.arrivalTime = arrivalTime;
        this.status = status;
        this.createdAt = createdAt;
    }


    public Long getId() {
        return id;
    }

    public Long getTouristId() {
        return touristId;
    }

    public void setTouristId(Long touristId) {
        this.touristId = touristId;
    }

    public Long getSeasonId() {
        return seasonId;
    }

    public void setSeasonId(Long seasonId) {
        this.seasonId = seasonId;
    }

    public Long getSelectedPackageId() {
        return selectedPackageId;
    }

    public void setSelectedPackageId(Long selectedPackageId) {
        this.selectedPackageId = selectedPackageId;
    }

    public Long getSelectedEventId() {
        return selectedEventId;
    }

    public void setSelectedEventId(Long selectedEventId) {
        this.selectedEventId = selectedEventId;
    }

    public List<Long> getSelectedVehiclePackageIds() {
        return selectedVehiclePackageIds;
    }

    public void setSelectedVehiclePackageIds(List<Long> selectedVehiclePackageIds) {
        this.selectedVehiclePackageIds = selectedVehiclePackageIds;
    }

    public double getOverallTotalPrice() {
        return overallTotalPrice;
    }

    public void setOverallTotalPrice(double overallTotalPrice) {
        this.overallTotalPrice = overallTotalPrice;
    }

    public int getPassengerCount() {
        return passengerCount;
    }

    public void setPassengerCount(int passengerCount) {
        this.passengerCount = passengerCount;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
