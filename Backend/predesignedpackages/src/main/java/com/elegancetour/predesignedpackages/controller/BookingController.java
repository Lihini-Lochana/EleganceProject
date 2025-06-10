package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.*;
import com.elegancetour.predesignedpackages.entity.Booking;
import com.elegancetour.predesignedpackages.entity.BookingResponse;
import com.elegancetour.predesignedpackages.entity.Tourist;
import com.elegancetour.predesignedpackages.repository.BookingRepository;
import com.elegancetour.predesignedpackages.repository.BookingResponseRepository;
import com.elegancetour.predesignedpackages.service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;



    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingResponseRepository bookingResponseRepository;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/{id}/notification")
    public ResponseEntity<BookingWithResponseDTO> getBookingNotificationDetails(@PathVariable Long id) {
        BookingWithResponseDTO dto = bookingService.getBookingDetailsForNotification(id);
        return ResponseEntity.ok(dto);
    }


    @PostMapping
    public BookingDTO createBooking(@RequestBody BookingDTO bookingDTO) {
        return bookingService.createBooking(bookingDTO);
    }

    @GetMapping("/admin")
    public List<BookingViewDTO> getAllBookingViews() {
        return bookingService.getAllBookingViews();
    }



    @GetMapping
    public List<BookingDTO> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/admin/{bookingId}/vehicle-packages")
    public ResponseEntity<BookingVehiclePackageViewDTO> getSelectedVehiclePackagesForAdmin(
            @PathVariable Long bookingId) {

        Booking booking = bookingService.getBookingEntityById(bookingId);

        List<Long> selectedVehiclePackageIds = booking.getVehiclePackages()
                .stream()
                .map(vp -> vp.getId())
                .collect(Collectors.toList());

        BookingVehiclePackageViewDTO dto = new BookingVehiclePackageViewDTO(bookingId, selectedVehiclePackageIds);
        return ResponseEntity.ok(dto);
    }


    @GetMapping("/admin/{id}")
    public ResponseEntity<BookingViewDTO> getBookingViewById(@PathVariable Long id) {
        BookingViewDTO bookingViewDTO = bookingService.getBookingViewById(id);
        return ResponseEntity.ok(bookingViewDTO);
    }


    @GetMapping("/{id}")
    public BookingDTO getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping("/tourist/{touristId}")
    public List<BookingDTO> getBookingsByTouristId(@PathVariable Long touristId) {
        return bookingService.getBookingsByTouristId(touristId);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }

    @PatchMapping("/{id}/cancel")
    public void cancelBooking(@PathVariable Long id, @RequestParam String reason) {
        bookingService.cancelBooking(id, reason);
    }

    @GetMapping("/{id}/get-cancel-reason")
    public ResponseEntity<BookingCancelReasonDTO> getCancelReasonOnly(@PathVariable Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        return ResponseEntity.ok(
                new BookingCancelReasonDTO(booking.getId(),
                        booking.getCancelReason() != null ? booking.getCancelReason() : "No cancellation reason provided.")
        );
    }


    @GetMapping("/admin/view/all")
    public ResponseEntity<List<BookingViewDTO>> getAllBookingsForAdmin() {
        List<Booking> bookings = bookingRepository.findAll();

        List<BookingViewDTO> response = bookings.stream()
                .map(this::mapToAdminViewDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }


    private BookingViewDTO mapToAdminViewDTO(Booking booking) {
        BookingViewDTO dto = new BookingViewDTO();

        dto.setBookingId(booking.getId());

        Tourist tourist = booking.getTourist();
        if (tourist != null) {
            dto.setTouristName(tourist.getFirstName() + " " + tourist.getLastName());
        }

        if (booking.getSeason() != null) {
            dto.setSeasonName(booking.getSeason().getName());
        }

        if (booking.getTourPackage() != null) {
            dto.setTourPackageName(booking.getTourPackage().getName());
        }

        if (booking.getEvent() != null) {
            dto.setEventName(booking.getEvent().getName());
        }

        dto.setVehiclePackageNames(
                booking.getVehiclePackages().stream()
                        .map(vp -> vp.getVehicle().getType())
                        .collect(Collectors.toList())
        );

        dto.setOverallTotalPrice(booking.getOverallTotalPrice());
        dto.setPassengerCount(booking.getPassengerCount());
        dto.setBookingDate(booking.getBookingDate());
        dto.setArrivalTime(booking.getArrivalTime());
        dto.setStatus(booking.getStatus());
        dto.setCancelReason(booking.getCancelReason());
        dto.setCreatedAt(booking.getCreatedAt());

        return dto;
    }


}



