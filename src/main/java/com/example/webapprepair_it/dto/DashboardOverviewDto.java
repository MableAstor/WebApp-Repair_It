package com.example.webapprepair_it.dto;

import java.util.List;

public class DashboardOverviewDto {

    private DashboardSummaryDto summary;
    private List<DashboardLatestRequestDto> latestRequests;
    private List<DashboardTechnicianWorkloadDto> technicianWorkloads;

    public DashboardOverviewDto(DashboardSummaryDto summary,
                                List<DashboardLatestRequestDto> latestRequests,
                                List<DashboardTechnicianWorkloadDto> technicianWorkloads) {
        this.summary = summary;
        this.latestRequests = latestRequests;
        this.technicianWorkloads = technicianWorkloads;
    }

    public DashboardSummaryDto getSummary() {
        return summary;
    }

    public List<DashboardLatestRequestDto> getLatestRequests() {
        return latestRequests;
    }

    public List<DashboardTechnicianWorkloadDto> getTechnicianWorkloads() {
        return technicianWorkloads;
    }
}