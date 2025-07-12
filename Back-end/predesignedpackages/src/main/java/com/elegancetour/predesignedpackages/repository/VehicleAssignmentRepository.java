package com.elegancetour.predesignedpackages.repository;


import com.elegancetour.predesignedpackages.entity.BookingResponse;
import com.elegancetour.predesignedpackages.entity.VehicleAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleAssignmentRepository extends JpaRepository<VehicleAssignment, Long> {
    List<VehicleAssignment> findByBookingResponse(BookingResponse bookingResponse);
}
