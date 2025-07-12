package com.elegancetour.predesignedpackages.dto;

public class GuideDTO {

    private Long id;
    private String name;
    private String phone;
    private String email;
    private String imageUrl;
    private String address;

    public GuideDTO() {}

    public GuideDTO(Long id, String name, String phone, String email, String imageUrl, String address) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.imageUrl = imageUrl;
        this.address = address;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String image) {
        this.imageUrl = image;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
