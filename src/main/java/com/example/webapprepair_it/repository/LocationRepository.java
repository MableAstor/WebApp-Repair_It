package com.example.webapprepair_it.repository;

import com.example.webapprepair_it.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
