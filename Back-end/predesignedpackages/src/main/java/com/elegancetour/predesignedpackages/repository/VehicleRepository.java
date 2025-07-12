package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.Vehicle;
import com.elegancetour.predesignedpackages.entity.VehiclePackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

}
