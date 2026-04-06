package com.example.webapprepair_it.repository;

import com.example.webapprepair_it.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RepairRequestRepository extends JpaRepository<RepairRequest, Long> {

    List<RepairRequest> findByStatus(RequestStatus status);
    List<RepairRequest> findByCategory(RepairCategory category);
    List<RepairRequest> findByCreatedById(Long userId);
    List<RepairRequest> findByAssignedToId(Long assignedToId);

    long countByStatus(RequestStatus status);
    long countByAssignedToId(Long assignedToId);

    List<RepairRequest> findAllByOrderByCreatedAtDesc(Pageable pageable);
}