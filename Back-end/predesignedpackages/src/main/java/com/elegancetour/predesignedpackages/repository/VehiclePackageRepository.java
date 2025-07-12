package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.VehiclePackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehiclePackageRepository extends JpaRepository<VehiclePackage, Long> {
    List<VehiclePackage> findByTourPackageId(Long tourPackageId);
    Optional<VehiclePackage> findByTourPackageIdAndVehicleId(Long tourPackageId, Long vehicleId);


}
