package com.elegancetour.predesignedpackages.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tourist tourist;

    @ManyToOne
    private Season season;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private TourPackage tourPackage;

    @ManyToMany
    private List<VehiclePackage> vehiclePackages;

    @ManyToOne
    private Event event;

    private double overallTotalPrice;
    private int passengerCount;
    private LocalDate bookingDate;
    private LocalTime arrivalTime;

    private String status;

    private String cancelReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Booking() {}

    public Booking(Tourist tourist, Season season, TourPackage tourPackage,
                   List<VehiclePackage> vehiclePackages, Event event, double overallTotalPrice,
                   int passengerCount, LocalDate bookingDate, LocalTime arrivalTime, String status, LocalDateTime createdAt) {
        this.tourist = tourist;
        this.season = season;
        this.tourPackage = tourPackage;
        this.vehiclePackages = vehiclePackages;
        this.event = event;
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

    public Tourist getTourist() {
        return tourist;
    }

    public void setTourist(Tourist tourist) {
        this.tourist = tourist;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public TourPackage getTourPackage() {
        return tourPackage;
    }

    public void setTourPackage(TourPackage tourPackage) {
        this.tourPackage = tourPackage;
    }

    public List<VehiclePackage> getVehiclePackages() {
        return vehiclePackages;
    }

    public void setVehiclePackages(List<VehiclePackage> vehiclePackages) {
        this.vehiclePackages = vehiclePackages;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
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
