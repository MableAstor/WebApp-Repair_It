package com.example.webapprepair_it.repository;
import com.example.webapprepair_it.entity.RepairStatusLog;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RepairStatusLogRepository extends JpaRepository<RepairStatusLog, Long> {
    List<RepairStatusLog> findByRepairRequestIdOrderByChangedAtAsc(Long repairRequestId);
    @Modifying
    @Transactional
    @Query("DELETE FROM RepairStatusLog r WHERE r.repairRequest.id = :repairRequestId")
    void deleteLogsByRepairRequestId(@Param("repairRequestId") Long repairRequestId);
}