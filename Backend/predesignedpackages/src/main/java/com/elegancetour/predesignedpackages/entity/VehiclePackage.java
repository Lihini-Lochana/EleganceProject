package com.elegancetour.predesignedpackages.entity;

import jakarta.persistence.*;

@Entity
public class VehiclePackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "tour_package_id", nullable = false)
    private TourPackage tourPackage;

    @ManyToOne(optional = true)
    @JoinColumn(name = "booking_id", nullable = true)
    private Booking booking;

    private double totalPrice;
    private double extraKmPrice;

    public VehiclePackage() {}

    public VehiclePackage(Vehicle vehicle, TourPackage tourPackage, double totalPrice, double extraKmPrice) {
        this.vehicle = vehicle;
        this.tourPackage = tourPackage;
        this.totalPrice = totalPrice;
        this.extraKmPrice = extraKmPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public TourPackage getTourPackage() {
        return tourPackage;
    }

    public void setTourPackage(TourPackage tourPackage) {
        this.tourPackage = tourPackage;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public double getExtraKmPrice() {
        return extraKmPrice;
    }

    public void setExtraKmPrice(double extraKmPrice) {
        this.extraKmPrice = extraKmPrice;
    }


}
