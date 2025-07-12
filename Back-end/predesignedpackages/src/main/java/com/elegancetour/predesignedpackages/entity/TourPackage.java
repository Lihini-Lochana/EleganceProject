package com.elegancetour.predesignedpackages.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tour_packages")
public class TourPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int nights;

    private int totalKilometers;
    private String pickupLocation;
    private String dropLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;

    @OneToMany(mappedBy = "tourPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PackagePlace> packagePlaces;

    @OneToMany(mappedBy = "tourPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VehiclePackage> vehiclePackages;


    public TourPackage() {}

    public TourPackage(String name,  int nights, int totalKilometers, String pickupLocation, String dropLocation, Season season, List<PackagePlace> packagePlaces, List<VehiclePackage> vehiclePackages) {
        this.name = name;
        this.nights = nights;
        this.totalKilometers = totalKilometers;
        this.pickupLocation = pickupLocation;
        this.dropLocation = dropLocation;
        this.season = season;
        this.packagePlaces = packagePlaces;
        this.vehiclePackages = vehiclePackages;
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

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public List<PackagePlace> getPackagePlaces() {
        return packagePlaces;
    }

    public void setPackagePlaces(List<PackagePlace> packagePlaces) {
        this.packagePlaces = packagePlaces;
    }

    public List<VehiclePackage> getVehiclePackages() {
        return vehiclePackages;
    }

    public void setVehiclePackages(List<VehiclePackage> vehiclePackages) {
        this.vehiclePackages = vehiclePackages;
    }
}
