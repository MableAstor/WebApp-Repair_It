package com.example.webapprepair_it.controller;

import com.example.webapprepair_it.dto.AssignTechnicianDto;
import com.example.webapprepair_it.dto.CreateRepairRequestDto;
import com.example.webapprepair_it.dto.DashboardSummaryDto;
import com.example.webapprepair_it.dto.UpdateRepairStatusDto;
import com.example.webapprepair_it.entity.RepairImage;
import com.example.webapprepair_it.entity.RepairRequest;
import com.example.webapprepair_it.entity.RepairStatusLog;
import com.example.webapprepair_it.entity.RequestStatus;
import com.example.webapprepair_it.service.RepairRequestService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/repair-requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RepairRequestController {

    private final RepairRequestService repairRequestService;

    public RepairRequestController(RepairRequestService repairRequestService) {
        this.repairRequestService = repairRequestService;
    }

    @PostMapping
    public RepairRequest create(@Valid @RequestBody CreateRepairRequestDto dto) {
        return repairRequestService.create(dto);
    }

    @GetMapping
    public List<RepairRequest> getAll() {
        return repairRequestService.findAll();
    }

    @GetMapping("/{id}")
    public RepairRequest getById(@PathVariable Long id) {
        return repairRequestService.findById(id);
    }

    @GetMapping("/status/{status}")
    public List<RepairRequest> getByStatus(@PathVariable RequestStatus status) {
        return repairRequestService.findByStatus(status);
    }

    @PatchMapping("/{id}/status")
    public RepairRequest updateStatus(@PathVariable Long id,
                                      @RequestBody UpdateRepairStatusDto dto) {
        return repairRequestService.updateStatus(id, dto);
    }

    @GetMapping("/{id}/status-logs")
    public List<RepairStatusLog> getStatusLogs(@PathVariable Long id) {
        return repairRequestService.getStatusLogs(id);
    }

    @PatchMapping("/{id}/assign")
    public RepairRequest assignTechnician(@PathVariable Long id,
                                          @RequestBody AssignTechnicianDto dto) {
        return repairRequestService.assignTechnician(id, dto.getTechnicianId());
    }

    @GetMapping("/assigned/{technicianId}")
    public List<RepairRequest> getByAssignedTechnician(@PathVariable Long technicianId) {
        return repairRequestService.getByAssignedTechnician(technicianId);
    }

    @PostMapping(value = "/{id}/upload-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<RepairImage> uploadImages(@PathVariable Long id,
                                          @RequestParam("files") MultipartFile[] files) throws IOException {
        return repairRequestService.uploadImages(id, files);
    }

    @GetMapping("/dashboard/summary")
    public DashboardSummaryDto getSummary() {
        return repairRequestService.getDashboardSummary();
    }
}