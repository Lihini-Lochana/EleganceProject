package com.elegancetour.predesignedpackages.repository;


import com.elegancetour.predesignedpackages.entity.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TouristRepository extends JpaRepository<Tourist, Long> {
}

