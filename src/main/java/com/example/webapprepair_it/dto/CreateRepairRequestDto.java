package com.example.webapprepair_it.dto;

import com.example.webapprepair_it.entity.RepairCategory;
import jakarta.validation.constraints.NotBlank;

public class CreateRepairRequestDto {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private RepairCategory category;

    private String building;
    private String floor;
    private String room;
    private String locationDescription;

    private Long createdByUserId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RepairCategory getCategory() {
        return category;
    }

    public void setCategory(RepairCategory category) {
        this.category = category;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getLocationDescription() {
        return locationDescription;
    }

    public void setLocationDescription(String locationDescription) {
        this.locationDescription = locationDescription;
    }

    public Long getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(Long createdByUserId) {
        this.createdByUserId = createdByUserId;
    }
}