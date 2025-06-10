package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TourPackageRepository extends JpaRepository<TourPackage, Long> {

    List<TourPackage> findBySeasonId(Long seasonId);

}
