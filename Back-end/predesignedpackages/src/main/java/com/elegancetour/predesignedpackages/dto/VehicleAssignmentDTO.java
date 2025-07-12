package com.elegancetour.predesignedpackages.dto;

import java.util.List;

public class VehicleAssignmentDTO {

    private Long id;
    private Long vehiclePackageId;
    private List<String> vehicleNumbers;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVehiclePackageId() {
        return vehiclePackageId;
    }

    public void setVehiclePackageId(Long vehiclePackageId) {
        this.vehiclePackageId = vehiclePackageId;
    }

    public List<String> getVehicleNumbers() {
        return vehicleNumbers;
    }

    public void setVehicleNumbers(List<String> vehicleNumbers) {
        this.vehicleNumbers = vehicleNumbers;
    }
}
