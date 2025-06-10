package com.elegancetour.predesignedpackages.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class BookingResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String responseStatus;

    private String rejectReason;

    private LocalDateTime respondedDate;

    @ManyToOne
    @JoinColumn(name = "booking_id", referencedColumnName = "id")
    private Booking booking;


    @ManyToMany
    @JoinTable(
            name = "booking_response_guides",
            joinColumns = @JoinColumn(name = "booking_response_id"),
            inverseJoinColumns = @JoinColumn(name = "guide_id")
    )
    private List<Guide> guides = new ArrayList<>();

    @OneToMany(mappedBy = "bookingResponse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VehicleAssignment> vehicleAssignments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public List<Guide> getGuides() {
        return guides;
    }

    public void setGuides(List<Guide> guides) {
        this.guides = guides;
    }

    public List<VehicleAssignment> getVehicleAssignments() {
        return vehicleAssignments;
    }

    public void setVehicleAssignments(List<VehicleAssignment> vehicleAssignments) {
        this.vehicleAssignments = vehicleAssignments;
    }
}
