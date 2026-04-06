package com.example.webapprepair_it.dto;

public class DashboardTechnicianWorkloadDto {

    private Long technicianId;
    private String technicianName;
    private long totalAssignedJobs;

    public DashboardTechnicianWorkloadDto(Long technicianId, String technicianName, long totalAssignedJobs) {
        this.technicianId = technicianId;
        this.technicianName = technicianName;
        this.totalAssignedJobs = totalAssignedJobs;
    }

    public Long getTechnicianId() {
        return technicianId;
    }

    public String getTechnicianName() {
        return technicianName;
    }

    public long getTotalAssignedJobs() {
        return totalAssignedJobs;
    }
}