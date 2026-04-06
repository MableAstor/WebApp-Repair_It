package com.example.webapprepair_it.dto;

import com.example.webapprepair_it.entity.RequestStatus;

import java.time.LocalDateTime;

public class DashboardLatestRequestDto {

    private Long id;
    private String requestCode;
    private String title;
    private RequestStatus status;
    private String createdByName;
    private String assignedToName;
    private LocalDateTime createdAt;

    public DashboardLatestRequestDto(Long id, String requestCode, String title,
                                     RequestStatus status, String createdByName,
                                     String assignedToName, LocalDateTime createdAt) {
        this.id = id;
        this.requestCode = requestCode;
        this.title = title;
        this.status = status;
        this.createdByName = createdByName;
        this.assignedToName = assignedToName;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public String getTitle() {
        return title;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public String getCreatedByName() {
        return createdByName;
    }

    public String getAssignedToName() {
        return assignedToName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}