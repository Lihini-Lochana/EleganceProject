package com.elegancetour.predesignedpackages.controller;


import com.elegancetour.predesignedpackages.dto.VehicleAssignmentDTO;
import com.elegancetour.predesignedpackages.service.VehicleAssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/vehicle-assignments")
public class VehicleAssignmentController {

    private final VehicleAssignmentService vehicleAssignmentService;

    public VehicleAssignmentController(VehicleAssignmentService vehicleAssignmentService) {
        this.vehicleAssignmentService = vehicleAssignmentService;
    }

    @PostMapping("/{bookingResponseId}")
    public VehicleAssignmentDTO addAssignment(
            @PathVariable Long bookingResponseId,
            @RequestBody VehicleAssignmentDTO dto) {
        return vehicleAssignmentService.addVehicleAssignment(bookingResponseId, dto);
    }

    @GetMapping("/{bookingResponseId}")
    public List<VehicleAssignmentDTO> getAssignmentsByResponse(@PathVariable Long bookingResponseId) {
        return vehicleAssignmentService.getAssignmentsByBookingResponse(bookingResponseId);
    }
}

