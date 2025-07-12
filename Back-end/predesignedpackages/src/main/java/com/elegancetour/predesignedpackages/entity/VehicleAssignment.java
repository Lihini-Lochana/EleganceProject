package com.elegancetour.predesignedpackages.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class VehicleAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vehicle_package_id", nullable = false)
    private VehiclePackage vehiclePackage;

    @ManyToOne
    @JoinColumn(name = "booking_response_id", nullable = false)
    private BookingResponse bookingResponse;

    @ElementCollection
    @CollectionTable(name = "vehicle_numbers", joinColumns = @JoinColumn(name = "vehicle_assignment_id"))
    @Column(name = "vehicle_number")
    private List<String> vehicleNumbers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VehiclePackage getVehiclePackage() {
        return vehiclePackage;
    }

    public void setVehiclePackage(VehiclePackage vehiclePackage) {
        this.vehiclePackage = vehiclePackage;
    }

    public BookingResponse getBookingResponse() {
        return bookingResponse;
    }

    public void setBookingResponse(BookingResponse bookingResponse) {
        this.bookingResponse = bookingResponse;
    }

    public List<String> getVehicleNumbers() {
        return vehicleNumbers;
    }

    public void setVehicleNumbers(List<String> vehicleNumbers) {
        this.vehicleNumbers = vehicleNumbers;
    }

    public Long getVehiclePackageId() {
        return vehiclePackage != null ? vehiclePackage.getId() : null;
    }

    public void setVehiclePackageId(Long vehiclePackageId) {
    }

    public String getVehicleNumber() {
        return vehicleNumbers != null && !vehicleNumbers.isEmpty() ? vehicleNumbers.get(0) : null;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumbers = List.of(vehicleNumber);
    }
}
