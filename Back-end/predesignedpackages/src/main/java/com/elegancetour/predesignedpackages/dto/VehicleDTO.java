package com.elegancetour.predesignedpackages.dto;

public class VehicleDTO {

    private Long id;
    private String type;
    private int minPassengers;
    private int maxPassengers;
    private String imageUrl;

    public VehicleDTO() {}

    public VehicleDTO(Long id, String type, int minPassengers, int maxPassengers, String imageUrl) {
        this.id = id;
        this.type = type;
        this.minPassengers = minPassengers;
        this.maxPassengers = maxPassengers;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getMinPassengers() {
        return minPassengers;
    }

    public void setMinPassengers(int minPassengers) {
        this.minPassengers = minPassengers;
    }

    public int getMaxPassengers() {
        return maxPassengers;
    }

    public void setMaxPassengers(int maxPassengers) {
        this.maxPassengers = maxPassengers;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
