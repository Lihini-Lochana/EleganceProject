package com.elegancetour.predesignedpackages.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "package_places")
public class PackagePlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int durationNights;


    @ManyToOne
    @JoinColumn(name = "tour_package_id", nullable = false)
    private TourPackage tourPackage;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

    public PackagePlace() {}

    public PackagePlace(TourPackage tourPackage, Place place, int durationNights) {
        this.tourPackage = tourPackage;
        this.place = place;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDurationNights() {
        return durationNights;
    }

    public void setDurationNights(int durationNights) {
        this.durationNights = durationNights;
    }

    public TourPackage getTourPackage() {
        return tourPackage;
    }

    public void setTourPackage(TourPackage tourPackage) {
        this.tourPackage = tourPackage;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }
}
