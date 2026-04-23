package com.example.webapprepair_it.repository;

import com.example.webapprepair_it.entity.RepairImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepairImageRepository extends JpaRepository<RepairImage, Long> {
    void deleteByRepairRequestId(Long repairRequestId);
}