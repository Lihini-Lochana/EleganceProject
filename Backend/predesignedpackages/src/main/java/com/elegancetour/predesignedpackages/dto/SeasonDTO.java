package com.elegancetour.predesignedpackages.dto;

import java.util.List;

public class SeasonDTO {

    private Long id;
    private String name;
    private String description;
    private List<Long> packageIds;

    public SeasonDTO() {}

    public SeasonDTO(Long id, String name, String description, List<Long> packageIds) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.packageIds = packageIds;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Long> getPackageIds() {
        return packageIds;
    }

    public void setPackageIds(List<Long> packageIds) {
        this.packageIds = packageIds;
    }
}
