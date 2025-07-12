package com.elegancetour.predesignedpackages.dto;

public class VehiclePackageDTO {

    private Long id;
    private Long vehicleId;
    private Long tourPackageId;
    private Long bookingId;
    private double totalPrice;
    private double extraKmPrice;

    public VehiclePackageDTO() {}

    public VehiclePackageDTO(Long id, Long vehicleId, Long tourPackageId, Long bookingId, double totalPrice, double extraKmPrice) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.tourPackageId = tourPackageId;
        this.bookingId = bookingId;
        this.totalPrice = totalPrice;
        this.extraKmPrice = extraKmPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Long getTourPackageId() {
        return tourPackageId;
    }

    public void setTourPackageId(Long tourPackageId) {
        this.tourPackageId = tourPackageId;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
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
