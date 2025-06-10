package com.elegancetour.predesignedpackages.dto;

public class PackagePlaceDTO {

    private Long id;

    private Long tourPackageId;
    private Long placeId;
    private int durationNights;


    public PackagePlaceDTO() {}

    public PackagePlaceDTO(Long id, Long tourPackageId, Long placeId, int durationNights) {
        this.id = id;
        this.tourPackageId = tourPackageId;
        this.placeId = placeId;
        this.durationNights = durationNights;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTourPackageId() {
        return tourPackageId;
    }

    public void setTourPackageId(Long tourPackageId) {
        this.tourPackageId = tourPackageId;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }

    public int getDurationNights() {
        return durationNights;
    }

    public void setDurationNights(int durationNights) {
        this.durationNights = durationNights;
    }
}
