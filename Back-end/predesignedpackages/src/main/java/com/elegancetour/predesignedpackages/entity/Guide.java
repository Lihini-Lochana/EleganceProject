package com.elegancetour.predesignedpackages.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Guide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private String email;
    private String imageUrl;
    private String address;

    @ManyToMany(mappedBy = "guides")
    private List<BookingResponse> bookingResponses;

    public Guide() {}

    public Guide(String name, String phone, String email, String imageUrl, String address) {
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

    public List<BookingResponse> getBookingResponses() {
        return bookingResponses;
    }

    public void setBookingResponses(List<BookingResponse> bookingResponses) {
        this.bookingResponses = bookingResponses;
    }
}

