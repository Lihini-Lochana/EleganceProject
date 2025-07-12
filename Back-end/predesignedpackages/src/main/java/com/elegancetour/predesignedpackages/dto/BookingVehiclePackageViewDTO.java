package com.elegancetour.predesignedpackages.dto;


import java.util.List;

public class BookingVehiclePackageViewDTO {
    private Long bookingId;
    private List<Long> selectedVehiclePackageIds;

    public BookingVehiclePackageViewDTO() {}

    public BookingVehiclePackageViewDTO(Long bookingId, List<Long> selectedVehiclePackageIds) {
        this.bookingId = bookingId;
        this.selectedVehiclePackageIds = selectedVehiclePackageIds;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public List<Long> getSelectedVehiclePackageIds() {
        return selectedVehiclePackageIds;
    }

    public void setSelectedVehiclePackageIds(List<Long> selectedVehiclePackageIds) {
        this.selectedVehiclePackageIds = selectedVehiclePackageIds;
    }
}
