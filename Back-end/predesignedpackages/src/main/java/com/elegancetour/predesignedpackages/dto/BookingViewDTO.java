package com.elegancetour.predesignedpackages.dto;


import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;

public class BookingViewDTO {

    private Long bookingId;

    private String touristName;
    private String seasonName;
    private String tourPackageName;
    private String eventName;
    private List<String> vehiclePackageNames;

    private double overallTotalPrice;
    private int passengerCount;
    private LocalDate bookingDate;
    private LocalTime arrivalTime;
    private String status;
    private String cancelReason;
    private LocalDateTime createdAt;

    public BookingViewDTO() {
    }

    public BookingViewDTO(Long bookingId, String touristName, String seasonName, String tourPackageName,
                          String eventName, List<String> vehiclePackageNames, double overallTotalPrice,
                          int passengerCount, LocalDate bookingDate, LocalTime arrivalTime,
                          String status, String cancelReason, LocalDateTime createdAt) {
        this.bookingId = bookingId;
        this.touristName = touristName;
        this.seasonName = seasonName;
        this.tourPackageName = tourPackageName;
        this.eventName = eventName;
        this.vehiclePackageNames = vehiclePackageNames;
        this.overallTotalPrice = overallTotalPrice;
        this.passengerCount = passengerCount;
        this.bookingDate = bookingDate;
        this.arrivalTime = arrivalTime;
        this.status = status;
        this.cancelReason = cancelReason;
        this.createdAt = createdAt;
    }


    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getTouristName() {
        return touristName;
    }

    public void setTouristName(String touristName) {
        this.touristName = touristName;
    }

    public String getSeasonName() {
        return seasonName;
    }

    public void setSeasonName(String seasonName) {
        this.seasonName = seasonName;
    }

    public String getTourPackageName() {
        return tourPackageName;
    }

    public void setTourPackageName(String tourPackageName) {
        this.tourPackageName = tourPackageName;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public List<String> getVehiclePackageNames() {
        return vehiclePackageNames;
    }

    public void setVehiclePackageNames(List<String> vehiclePackageNames) {
        this.vehiclePackageNames = vehiclePackageNames;
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
