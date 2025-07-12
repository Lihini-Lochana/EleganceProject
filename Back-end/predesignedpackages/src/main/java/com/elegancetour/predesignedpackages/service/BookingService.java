package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.*;
import com.elegancetour.predesignedpackages.entity.*;
import com.elegancetour.predesignedpackages.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private TouristRepository touristRepository;

    @Autowired
    private BookingResponseRepository bookingResponseRepository;
    @Autowired
    private SeasonRepository seasonRepository;
    @Autowired
    private TourPackageRepository packageRepository;
    @Autowired
    private VehiclePackageRepository vehiclePackageRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private VehiclePackageService vehiclePackageService;
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private NotificationService notificationService;

    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Tourist tourist = touristRepository.findById(bookingDTO.getTouristId())
                .orElseThrow(() -> new RuntimeException("Tourist not found"));

        Season season = seasonRepository.findById(bookingDTO.getSeasonId())
                .orElseThrow(() -> new RuntimeException("Season not found"));

        TourPackage tourPackage = packageRepository.findById(bookingDTO.getSelectedPackageId())
                .orElseThrow(() -> new RuntimeException("Tour Package not found"));

        Event event = (bookingDTO.getSelectedEventId() != null)
                ? eventRepository.findById(bookingDTO.getSelectedEventId()).orElse(null)
                : null;

        List<VehicleDTO> selectedVehicles = vehiclePackageService
                .suggestVehicleCombination(bookingDTO.getSelectedPackageId(), bookingDTO.getPassengerCount());

        List<VehiclePackage> vehiclePackages = new ArrayList<>();
        for (VehicleDTO vehicleDTO : selectedVehicles) {
            VehiclePackage vehiclePackage = vehiclePackageRepository.findByTourPackageIdAndVehicleId(
                            bookingDTO.getSelectedPackageId(), vehicleDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Vehicle Package not found for vehicle: " + vehicleDTO.getType()));
            vehiclePackages.add(vehiclePackage);
        }

        double overallTotalPrice = calculateOverallTotalPrice(vehiclePackages, event);

        LocalDate bookingDate = bookingDTO.getBookingDate();
        LocalTime arrivalTime = bookingDTO.getArrivalTime();
        LocalDateTime createdAt = LocalDateTime.now();

        Booking booking = new Booking(
                tourist, season, tourPackage, vehiclePackages, event,
                overallTotalPrice, bookingDTO.getPassengerCount(),
                bookingDate, arrivalTime, "PENDING", createdAt
        );

        Booking savedBooking = bookingRepository.save(booking);

        for (VehiclePackage vehiclePackage : vehiclePackages) {
            vehiclePackage.setBooking(savedBooking);
        }
        vehiclePackageRepository.saveAll(vehiclePackages);

        notificationService.notifyGuideNewBooking(savedBooking);

        return new BookingDTO(
                savedBooking.getId(),
                savedBooking.getOverallTotalPrice(),
                savedBooking.getPassengerCount(),
                savedBooking.getBookingDate(),
                savedBooking.getArrivalTime(),
                savedBooking.getStatus(),
                savedBooking.getCreatedAt()
        );
    }

    private double calculateOverallTotalPrice(List<VehiclePackage> selectedVehiclePackages, Event event) {
        double totalVehiclePrice = selectedVehiclePackages.stream()
                .mapToDouble(VehiclePackage::getTotalPrice)
                .sum();
        double eventPrice = (event != null) ? event.getPrice() : 0.0;
        return totalVehiclePrice + eventPrice;
    }

    public Booking getBookingEntityById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + id));
    }



    public List<BookingViewDTO> getAllBookingViews() {
        return bookingRepository.findAll().stream().map(booking -> {
            String touristName = booking.getTourist().getFirstName() + " " + booking.getTourist().getLastName();
            String seasonName = booking.getSeason().getName();
            String tourPackageName = booking.getTourPackage().getName();
            String eventName = booking.getEvent() != null ? booking.getEvent().getName() : "None";

            List<String> vehiclePackageNames = booking.getVehiclePackages().stream()
                    .map(vp -> vp.getVehicle().getType())
                    .toList();

            return new BookingViewDTO(
                    booking.getId(),
                    touristName,
                    seasonName,
                    tourPackageName,
                    eventName,
                    vehiclePackageNames,
                    booking.getOverallTotalPrice(),
                    booking.getPassengerCount(),
                    booking.getBookingDate(),
                    booking.getArrivalTime(),
                    booking.getStatus(),
                    booking.getCancelReason(),
                    booking.getCreatedAt()
            );
        }).toList();
    }

    public BookingWithResponseDTO getBookingDetailsForNotification(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        BookingDTO bookingDTO = mapToDTO(booking);

        BookingResponse response = bookingResponseRepository.findByBookingId(bookingId).orElse(null);

        BookingResponseDTO responseDTO = (response != null) ? mapToDTO(response) : null;

        return new BookingWithResponseDTO(bookingDTO, responseDTO);
    }


    private BookingDTO mapToDTO(Booking booking) {
        return new BookingDTO(
                booking.getId(),
                booking.getOverallTotalPrice(),
                booking.getPassengerCount(),
                booking.getBookingDate(),
                booking.getArrivalTime(),
                booking.getStatus(),
                booking.getCreatedAt()
        );
    }

    private BookingResponseDTO mapToDTO(BookingResponse response) {
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

        List<VehicleAssignmentDTO> assignments = new ArrayList<>();
        if (response.getVehicleAssignments() != null) {
            for (VehicleAssignment va : response.getVehicleAssignments()) {
                VehicleAssignmentDTO vaDto = new VehicleAssignmentDTO();
                vaDto.setId(va.getId());
                vaDto.setVehiclePackageId(va.getVehiclePackage().getId());
                vaDto.setVehicleNumbers(va.getVehicleNumbers());
                assignments.add(vaDto);
            }
        }
        dto.setVehicleAssignments(assignments);

        return dto;
    }



    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(booking -> new BookingDTO(
                        booking.getId(), booking.getOverallTotalPrice(),
                        booking.getPassengerCount(), booking.getBookingDate(),
                        booking.getArrivalTime(), booking.getStatus(),
                        booking.getCreatedAt()))
                .toList();
    }

    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return new BookingDTO(
                booking.getId(), booking.getOverallTotalPrice(),
                booking.getPassengerCount(), booking.getBookingDate(),
                booking.getArrivalTime(), booking.getStatus(),
                booking.getCreatedAt());
    }

    public BookingViewDTO getBookingViewById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        List<String> vehiclePackageNames = booking.getVehiclePackages()
                .stream()
                .map(vp -> vp.getVehicle().getType())
                .collect(Collectors.toList());

        String touristFullName = booking.getTourist().getFirstName() + " " + booking.getTourist().getLastName();

        return new BookingViewDTO(
                booking.getId(),
                touristFullName,
                booking.getSeason() != null ? booking.getSeason().getName() : null,
                booking.getTourPackage().getName(),
                booking.getEvent() != null ? booking.getEvent().getName() : null,
                vehiclePackageNames,
                booking.getOverallTotalPrice(),
                booking.getPassengerCount(),
                booking.getBookingDate(),
                booking.getArrivalTime(),
                booking.getStatus(),
                booking.getCancelReason(),
                booking.getCreatedAt()
        );
    }

    public List<BookingDTO> getBookingsByTouristId(Long touristId) {
        return bookingRepository.findByTouristId(touristId).stream()
                .map(booking -> new BookingDTO(
                        booking.getId(), booking.getOverallTotalPrice(),
                        booking.getPassengerCount(), booking.getBookingDate(),
                        booking.getArrivalTime(), booking.getStatus(),
                        booking.getCreatedAt()))
                .toList();
    }

    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found");
        }
        bookingRepository.deleteById(id);
    }

    public void cancelBooking(Long bookingId, String reasonForCancel) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("CANCELLED");
        booking.setCancelReason(reasonForCancel);

        bookingRepository.save(booking);

        notificationService.notifyGuideBookingCancelled(booking);
    }



}
