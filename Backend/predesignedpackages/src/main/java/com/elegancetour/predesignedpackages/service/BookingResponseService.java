package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.BookingResponseDTO;
import com.elegancetour.predesignedpackages.dto.VehicleAssignmentDTO;
import com.elegancetour.predesignedpackages.entity.*;
import com.elegancetour.predesignedpackages.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingResponseService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingResponseRepository bookingResponseRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private VehiclePackageRepository vehiclePackageRepository;

    @Autowired
    private NotificationService notificationService;

    public BookingResponseDTO createAcceptedResponse(BookingResponseDTO dto) {
        Booking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("ACCEPTED");
        bookingRepository.save(booking);

        BookingResponse response = new BookingResponse();
        response.setBooking(booking);
        response.setResponseStatus("ACCEPTED");
        response.setRespondedDate(LocalDateTime.now());

        List<Guide> guides = guideRepository.findAllById(dto.getGuideIds());
        response.setGuides(guides);

        List<VehicleAssignment> assignments = new ArrayList<>();
        for (VehicleAssignmentDTO vaDto : dto.getVehicleAssignments()) {
            VehicleAssignment va = new VehicleAssignment();

            VehiclePackage vehiclePackage = vehiclePackageRepository.findById(vaDto.getVehiclePackageId())
                    .orElseThrow(() -> new RuntimeException("VehiclePackage not found with ID: " + vaDto.getVehiclePackageId()));
            va.setVehiclePackage(vehiclePackage);

            va.setVehicleNumbers(vaDto.getVehicleNumbers());
            va.setBookingResponse(response);
            assignments.add(va);
        }
        response.setVehicleAssignments(assignments);

        bookingResponseRepository.save(response);

        notificationService.sendNotificationToTourist(
                booking.getTourist().getId(),
                "Your booking has been ACCEPTED.",
                booking
        );

        return toDto(response);
    }

    public BookingResponseDTO rejectBooking(Long bookingId, String rejectReason) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("REJECTED");
        bookingRepository.save(booking);

        BookingResponse response = new BookingResponse();
        response.setBooking(booking);
        response.setResponseStatus("REJECTED");
        response.setRejectReason(rejectReason);
        response.setRespondedDate(LocalDateTime.now());
        response.setGuides(new ArrayList<>());
        response.setVehicleAssignments(new ArrayList<>());


        bookingResponseRepository.save(response);

        notificationService.sendNotificationToTourist(
                booking.getTourist().getId(),
                "Your booking has been REJECTED. Reason: " + rejectReason,
                booking
        );

        return toDto(response);
    }


    public BookingResponseDTO getByBookingId(Long bookingId) {
        Optional<BookingResponse> responseOpt = bookingResponseRepository.findByBookingId(bookingId);
        if (responseOpt.isEmpty()) throw new RuntimeException("Response not found");
        return toDto(responseOpt.get());
    }

    private BookingResponseDTO toDto(BookingResponse response) {
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setId(response.getId());
        dto.setBookingId(response.getBooking().getId());
        dto.setResponseStatus(response.getResponseStatus());
        dto.setRejectReason(response.getRejectReason());
        dto.setRespondedDate(response.getRespondedDate());

        List<Long> guideIds = new ArrayList<>();
        List<String> guideNames = new ArrayList<>();
        if (response.getGuides() != null) {
            for (Guide guide : response.getGuides()) {
                guideIds.add(guide.getId());
                guideNames.add(guide.getName());
            }
        }
        dto.setGuideIds(guideIds);
        dto.setGuideNames(guideNames);

        List<VehicleAssignmentDTO> assignmentDtos = new ArrayList<>();
        if (response.getVehicleAssignments() != null) {
            for (VehicleAssignment va : response.getVehicleAssignments()) {
                VehicleAssignmentDTO vaDto = new VehicleAssignmentDTO();
                vaDto.setId(va.getId());
                vaDto.setVehiclePackageId(va.getVehiclePackage().getId());
                vaDto.setVehicleNumbers(va.getVehicleNumbers());
                assignmentDtos.add(vaDto);
            }
        }
        dto.setVehicleAssignments(assignmentDtos);

        return dto;
    }

}
