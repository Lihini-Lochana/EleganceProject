package com.elegancetour.predesignedpackages.dto;

import java.util.ArrayList;
import java.util.List;

public class TourPackageDTO {

    private Long id;
    private String name;
    private int nights;

    private int totalKilometers;
    private String pickupLocation;
    private String dropLocation;
    private Long seasonId;
    private List<PackagePlaceDTO> packagePlaces = new ArrayList<>();
    private List<VehiclePackageDTO> vehiclePackages = new ArrayList<>();

    public TourPackageDTO() {
        this.packagePlaces = new ArrayList<>();
        this.vehiclePackages = new ArrayList<>();
    }

    public TourPackageDTO(Long id, String name, int nights, int totalKilometers, String pickupLocation, String dropLocation, Long seasonId, List<PackagePlaceDTO> packagePlaces, List<VehiclePackageDTO> vehiclePackages) {
        this.id = id;
        this.name = name;
        this.nights = nights;
        this.totalKilometers = totalKilometers;
        this.pickupLocation = pickupLocation;
        this.dropLocation = dropLocation;
        this.seasonId = seasonId;
        this.packagePlaces = packagePlaces != null ? packagePlaces : new ArrayList<>();
        this.vehiclePackages = vehiclePackages != null ? vehiclePackages : new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNights() {
        return nights;
    }

    public void setNights(int nights) {
        this.nights = nights;
    }

    public int getTotalKilometers() {
        return totalKilometers;
    }

    public void setTotalKilometers(int totalKilometers) {
        this.totalKilometers = totalKilometers;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDropLocation() {
        return dropLocation;
    }

    public void setDropLocation(String dropLocation) {
        this.dropLocation = dropLocation;
    }

    public Long getSeasonId() {
        return seasonId;
    }

    public void setSeasonId(Long seasonId) {
        this.seasonId = seasonId;
    }

    public List<PackagePlaceDTO> getPackagePlaces() {
        return packagePlaces;
    }

    public void setPackagePlaces(List<PackagePlaceDTO> packagePlaces) {
        this.packagePlaces = packagePlaces != null ? packagePlaces : new ArrayList<>();
    }

    public List<VehiclePackageDTO> getVehiclePackages() {
        return vehiclePackages;
    }

    public void setVehiclePackages(List<VehiclePackageDTO> vehiclePackages) {
        this.vehiclePackages = vehiclePackages != null ? vehiclePackages : new ArrayList<>();
    }
}
