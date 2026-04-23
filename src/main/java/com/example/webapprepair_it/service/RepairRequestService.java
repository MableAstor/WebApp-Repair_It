package com.example.webapprepair_it.service;

import com.example.webapprepair_it.ResourceNotFoundException;
import com.example.webapprepair_it.dto.*;
import com.example.webapprepair_it.entity.*;
import com.example.webapprepair_it.repository.RepairImageRepository;
import com.example.webapprepair_it.repository.RepairRequestRepository;
import com.example.webapprepair_it.repository.RepairStatusLogRepository;
import com.example.webapprepair_it.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RepairRequestService {

    private final RepairRequestRepository repairRequestRepository;
    private final UserRepository userRepository;
    private final RepairStatusLogRepository repairStatusLogRepository;
    private final RepairImageRepository repairImageRepository;
    private final AIService aiService;

    public RepairRequestService(RepairRequestRepository repairRequestRepository,
                                UserRepository userRepository,
                                RepairStatusLogRepository repairStatusLogRepository,
                                RepairImageRepository repairImageRepository,
                                AIService aiService) {
        this.repairRequestRepository = repairRequestRepository;
        this.userRepository = userRepository;
        this.repairStatusLogRepository = repairStatusLogRepository;
        this.repairImageRepository = repairImageRepository;
        this.aiService = aiService;
    }

    public RepairRequest create(CreateRepairRequestDto dto) {
        User user = userRepository.findById(dto.getCreatedByUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Location location = new Location();
        location.setBuilding(dto.getBuilding());
        location.setFloor(dto.getFloor());
        location.setRoom(dto.getRoom());
        location.setDescription(dto.getLocationDescription());

        AIResponse aiResult = aiService.analyze(dto.getDescription(), dto.getCategory());

        RepairRequest request = new RepairRequest();
        request.setRequestCode("REP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        request.setTitle(dto.getTitle());
        request.setDescription(dto.getDescription());
        request.setCreatedBy(user);
        request.setLocation(location);
        request.setStatus(RequestStatus.PENDING);

        request.setAiTag(aiResult.getCategory());

        if ("HIGH".equals(aiResult.getSeverity())) {
            request.setSeverity(SeverityLevel.HIGH);
            request.setAiSeverityScore(3);
        } else if ("MEDIUM".equals(aiResult.getSeverity())) {
            request.setSeverity(SeverityLevel.MEDIUM);
            request.setAiSeverityScore(2);
        } else {
            request.setSeverity(SeverityLevel.LOW);
            request.setAiSeverityScore(1);
        }

        request.setCategory(dto.getCategory());
        request.setAiTag(aiResult.getCategory());

        request.setLatitude(dto.getLatitude());
        request.setLongitude(dto.getLongitude());

        return repairRequestRepository.save(request);
    }

    public List<RepairRequest> findAll() {
        return repairRequestRepository.findAll();
    }

    public RepairRequest findById(Long id) {
        return repairRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair request not found"));
    }

    public List<RepairRequest> findByStatus(RequestStatus status) {
        return repairRequestRepository.findByStatus(status);
    }

    public RepairRequest updateStatus(Long repairRequestId, UpdateRepairStatusDto dto) {
        RepairRequest request = repairRequestRepository.findById(repairRequestId)
                .orElseThrow(() -> new RuntimeException("Repair request not found"));

        User changedBy = userRepository.findById(dto.getChangedByUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        RequestStatus oldStatus = request.getStatus();
        request.setStatus(dto.getStatus());

        RepairRequest updatedRequest = repairRequestRepository.save(request);

        RepairStatusLog log = new RepairStatusLog();
        log.setRepairRequest(updatedRequest);
        log.setChangedBy(changedBy);
        log.setOldStatus(oldStatus);
        log.setNewStatus(dto.getStatus());
        log.setRemark(dto.getRemark());

        repairStatusLogRepository.save(log);

        return updatedRequest;
    }

    public List<RepairStatusLog> getStatusLogs(Long repairRequestId) {
        return repairStatusLogRepository.findByRepairRequestIdOrderByChangedAtAsc(repairRequestId);
    }

    public RepairRequest assignTechnician(Long repairRequestId, Long technicianId) {
        RepairRequest request = repairRequestRepository.findById(repairRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Repair request not found"));

        User technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        if (technician.getRole() != Role.TECHNICIAN) {
            throw new RuntimeException("Selected user is not a technician");
        }

        request.setAssignedTo(technician);

        return repairRequestRepository.save(request);
    }

    public List<RepairRequest> getByAssignedTechnician(Long technicianId) {
        return repairRequestRepository.findByAssignedToId(technicianId);
    }

    public List<RepairImage> uploadImages(Long repairRequestId, MultipartFile[] files) throws IOException {
        RepairRequest request = repairRequestRepository.findById(repairRequestId)
                .orElseThrow(() -> new RuntimeException("Repair request not found"));

        if (files == null || files.length == 0) {
            throw new RuntimeException("No files uploaded");
        }

        if (files.length > 2) {
            throw new RuntimeException("Maximum 2 images allowed");
        }

        Path uploadPath = Paths.get("uploads");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        List<RepairImage> images = new ArrayList<>();

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            String contentType = file.getContentType();
            if (contentType == null ||
                    (!contentType.equals("image/jpeg")
                            && !contentType.equals("image/png")
                            && !contentType.equals("image/jpg"))) {
                throw new RuntimeException("Only JPG, JPEG, PNG files are allowed");
            }

            String originalName = file.getOriginalFilename();
            String fileName = UUID.randomUUID() + "_" + originalName;
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            RepairImage image = new RepairImage();
            image.setFileName(fileName);
            image.setFilePath("/uploads/" + fileName);
            image.setRepairRequest(request);

            images.add(image);
        }

        if (images.isEmpty()) {
            throw new RuntimeException("No valid files uploaded");
        }

        return repairImageRepository.saveAll(images);
    }

    public DashboardSummaryDto getDashboardSummary() {
        long total = repairRequestRepository.count();
        long pending = repairRequestRepository.countByStatus(RequestStatus.PENDING);
        long inProgress = repairRequestRepository.countByStatus(RequestStatus.IN_PROGRESS);
        long completed = repairRequestRepository.countByStatus(RequestStatus.COMPLETED);

        return new DashboardSummaryDto(total, pending, inProgress, completed);
    }

    public List<DashboardLatestRequestDto> getLatestRequests() {
        List<RepairRequest> requests =
                repairRequestRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 5));

        return requests.stream()
                .map(request -> new DashboardLatestRequestDto(
                        request.getId(),
                        request.getRequestCode(),
                        request.getTitle(),
                        request.getStatus(),
                        request.getCreatedBy() != null ? request.getCreatedBy().getFullName() : null,
                        request.getAssignedTo() != null ? request.getAssignedTo().getFullName() : null,
                        request.getCreatedAt()
                ))
                .toList();
    }

    public List<DashboardTechnicianWorkloadDto> getTechnicianWorkloads() {
        List<User> technicians = userRepository.findByRole(Role.TECHNICIAN);

        return technicians.stream()
                .map(tech -> new DashboardTechnicianWorkloadDto(
                        tech.getId(),
                        tech.getFullName(),
                        repairRequestRepository.countByAssignedToId(tech.getId())
                ))
                .toList();
    }

    public DashboardOverviewDto getDashboardOverview() {
        return new DashboardOverviewDto(
                getDashboardSummary(),
                getLatestRequests(),
                getTechnicianWorkloads()
        );
    }

    public List<RepairRequest> getAIQueue() {
        List<RepairRequest> requests = repairRequestRepository.findAll();

        return requests.stream()
                .sorted((a, b) -> {
                    int scoreA = calculateScore(a);
                    int scoreB = calculateScore(b);
                    return Integer.compare(scoreB, scoreA);
                })
                .toList();
    }

    private int calculateScore(RepairRequest r) {
        int score = 0;

        if (r.getStatus() == RequestStatus.IN_PROGRESS) score += 100;
        else if (r.getStatus() == RequestStatus.PENDING) score += 60;
        else if (r.getStatus() == RequestStatus.COMPLETED) score += 0;
        else if (r.getStatus() == RequestStatus.REJECTED) score -= 100;

        if (r.getAiSeverityScore() != null) {
            score += r.getAiSeverityScore() * 50;
        }

        return score;
    }

    @Transactional
    public void deleteCompletedRequest(Long id) {
        RepairRequest request = repairRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair request not found"));

        if (request.getStatus() != RequestStatus.COMPLETED) {
            throw new RuntimeException("Can delete only completed requests");
        }

        repairStatusLogRepository.deleteLogsByRepairRequestId(id);
        repairImageRepository.deleteByRepairRequestId(id);
        repairRequestRepository.delete(request);
    }
}