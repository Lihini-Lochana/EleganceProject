package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.VehicleAssignmentDTO;
import com.elegancetour.predesignedpackages.entity.BookingResponse;
import com.elegancetour.predesignedpackages.entity.VehicleAssignment;
import com.elegancetour.predesignedpackages.entity.VehiclePackage;
import com.elegancetour.predesignedpackages.repository.BookingResponseRepository;
import com.elegancetour.predesignedpackages.repository.VehicleAssignmentRepository;
import com.elegancetour.predesignedpackages.repository.VehiclePackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleAssignmentService {

    private final VehicleAssignmentRepository vehicleAssignmentRepository;
    private final BookingResponseRepository bookingResponseRepository;
    private final VehiclePackageRepository vehiclePackageRepository;

    public VehicleAssignmentService(
            VehicleAssignmentRepository vehicleAssignmentRepository,
            BookingResponseRepository bookingResponseRepository,
            VehiclePackageRepository vehiclePackageRepository) {
        this.vehicleAssignmentRepository = vehicleAssignmentRepository;
        this.bookingResponseRepository = bookingResponseRepository;
        this.vehiclePackageRepository = vehiclePackageRepository;
    }

    public List<VehicleAssignmentDTO> getAssignmentsByBookingResponse(Long bookingResponseId) {
        BookingResponse bookingResponse = bookingResponseRepository.findById(bookingResponseId)
                .orElseThrow(() -> new RuntimeException("Booking response not found"));

        List<VehicleAssignment> assignments = vehicleAssignmentRepository.findByBookingResponse(bookingResponse);
        return assignments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public VehicleAssignmentDTO addVehicleAssignment(Long bookingResponseId, VehicleAssignmentDTO dto) {
        BookingResponse bookingResponse = bookingResponseRepository.findById(bookingResponseId)
                .orElseThrow(() -> new RuntimeException("Booking response not found"));

        VehiclePackage vehiclePackage = vehiclePackageRepository.findById(dto.getVehiclePackageId())
                .orElseThrow(() -> new RuntimeException("VehiclePackage not found"));

        VehicleAssignment assignment = new VehicleAssignment();
        assignment.setBookingResponse(bookingResponse);
        assignment.setVehiclePackage(vehiclePackage);
        assignment.setVehicleNumbers(dto.getVehicleNumbers());

        VehicleAssignment saved = vehicleAssignmentRepository.save(assignment);
        return convertToDto(saved);
    }

    private VehicleAssignmentDTO convertToDto(VehicleAssignment assignment) {
        VehicleAssignmentDTO dto = new VehicleAssignmentDTO();
        dto.setId(assignment.getId());
        dto.setVehiclePackageId(assignment.getVehiclePackage().getId());
        dto.setVehicleNumbers(assignment.getVehicleNumbers());
        return dto;
    }
}
