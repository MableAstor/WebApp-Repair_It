package com.example.webapprepair_it.repository;
import com.example.webapprepair_it.entity.RepairStatusLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepairStatusLogRepository extends JpaRepository<RepairStatusLog, Long> {
    List<RepairStatusLog> findByRepairRequestIdOrderByChangedAtAsc(Long repairRequestId);
}