package com.elegancetour.predesignedpackages.repository;


import com.elegancetour.predesignedpackages.entity.Booking;
import com.elegancetour.predesignedpackages.entity.VehiclePackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByTouristId(Long touristId);

}

