package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.PackagePlace;
import com.elegancetour.predesignedpackages.entity.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackagePlaceRepository extends JpaRepository<PackagePlace, Long> {
    List<PackagePlace> findByTourPackage(TourPackage tourPackage);

}
