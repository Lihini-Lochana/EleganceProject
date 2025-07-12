package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.BookingDTO;
import com.elegancetour.predesignedpackages.dto.VehicleDTO;
import com.elegancetour.predesignedpackages.entity.*;
import com.elegancetour.predesignedpackages.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class BookingServiceTest {
    @InjectMocks
    private BookingService bookingService;

    @Mock
    private BookingRepository bookingRepository;
    @Mock
    private TouristRepository touristRepository;
    @Mock
    private SeasonRepository seasonRepository;
    @Mock
    private TourPackageRepository packageRepository;
    @Mock
    private VehiclePackageRepository vehiclePackageRepository;
    @Mock
    private EventRepository eventRepository;
    @Mock
    private VehiclePackageService vehiclePackageService;
    @Mock
    private NotificationService notificationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateBooking_Success() {

        Long touristId = 1L;
        Long seasonId = 1L;
        Long packageId = 14L;
        Long eventId = 1L;

        BookingDTO request = new BookingDTO();
        request.setTouristId(touristId);
        request.setSeasonId(seasonId);
        request.setSelectedPackageId(packageId);
        request.setSelectedEventId(eventId);
        request.setPassengerCount(2);
        request.setBookingDate(LocalDate.now());
        request.setArrivalTime(LocalTime.of(10, 0));

        Tourist tourist = new Tourist();
        Season season = new Season();
        TourPackage tourPackage = new TourPackage();
        Event event = new Event();
        event.setPrice(50);

        VehiclePackage vehiclePackage = new VehiclePackage();
        vehiclePackage.setId(20L);
        vehiclePackage.setTotalPrice(980);
        Vehicle vehicle = new Vehicle();
        vehicle.setId(1L);
        vehicle.setType("Wagon R");
        vehiclePackage.setVehicle(vehicle);

        VehicleDTO vehicleDTO = new VehicleDTO();
        vehicleDTO.setId(1L);
        vehicleDTO.setType("Wagon R");

        when(touristRepository.findById(touristId)).thenReturn(Optional.of(tourist));
        when(seasonRepository.findById(seasonId)).thenReturn(Optional.of(season));
        when(packageRepository.findById(packageId)).thenReturn(Optional.of(tourPackage));
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));
        when(vehiclePackageService.suggestVehicleCombination(packageId, 2))
                .thenReturn(Collections.singletonList(vehicleDTO));
        when(vehiclePackageRepository.findByTourPackageIdAndVehicleId(packageId, 1L))
                .thenReturn(Optional.of(vehiclePackage));

        Booking savedBooking = new Booking();
        savedBooking.setOverallTotalPrice(1030);
        savedBooking.setPassengerCount(2);
        savedBooking.setBookingDate(request.getBookingDate());
        savedBooking.setArrivalTime(request.getArrivalTime());
        savedBooking.setStatus("PENDING");
        savedBooking.setCreatedAt(LocalDateTime.now());

        when(bookingRepository.save(any(Booking.class))).thenReturn(savedBooking);

        BookingDTO result = bookingService.createBooking(request);

        assertNotNull(result);
        assertEquals(1030, result.getOverallTotalPrice());
        assertEquals(2, result.getPassengerCount());
        assertEquals("PENDING", result.getStatus());
        verify(notificationService, times(1)).notifyGuideNewBooking(any(Booking.class));
    }

    @Test
    void testCreateBooking_TouristNotFound() {
        BookingDTO request = new BookingDTO();
        request.setTouristId(99L);
        when(touristRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            bookingService.createBooking(request);
        });

        assertEquals("Tourist not found", exception.getMessage());
    }

    @Test
    void testCreateBooking_SeasonNotFound() {
        BookingDTO request = new BookingDTO();
        request.setTouristId(1L);
        request.setSeasonId(5L);

        when(touristRepository.findById(1L)).thenReturn(Optional.of(new Tourist()));
        when(seasonRepository.findById(5L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            bookingService.createBooking(request);
        });

        assertEquals("Season not found", exception.getMessage());
    }

    @Test
    void testCreateBooking_TourPackageNotFound() {
        BookingDTO request = new BookingDTO();
        request.setTouristId(1L);
        request.setSeasonId(1L);
        request.setSelectedPackageId(30L);

        when(touristRepository.findById(1L)).thenReturn(Optional.of(new Tourist()));
        when(seasonRepository.findById(1L)).thenReturn(Optional.of(new Season()));
        when(packageRepository.findById(30L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            bookingService.createBooking(request);
        });

        assertEquals("Tour Package not found", exception.getMessage());
    }

    @Test
    void testCreateBooking_VehiclePackageNotFound() {
        Long touristId = 1L, seasonId = 1L, packageId = 26L;

        BookingDTO request = new BookingDTO();
        request.setTouristId(touristId);
        request.setSeasonId(seasonId);
        request.setSelectedPackageId(packageId);
        request.setPassengerCount(3);

        VehicleDTO vehicleDTO = new VehicleDTO();
        vehicleDTO.setId(2L);
        vehicleDTO.setType("Sedan");

        when(touristRepository.findById(touristId)).thenReturn(Optional.of(new Tourist()));
        when(seasonRepository.findById(seasonId)).thenReturn(Optional.of(new Season()));
        when(packageRepository.findById(packageId)).thenReturn(Optional.of(new TourPackage()));
        when(vehiclePackageService.suggestVehicleCombination(packageId, 3))
                .thenReturn(Collections.singletonList(vehicleDTO));
        when(vehiclePackageRepository.findByTourPackageIdAndVehicleId(packageId, 2L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            bookingService.createBooking(request);
        });

        assertEquals("Vehicle Package not found for vehicle: Sedan", exception.getMessage());
    }

    @Test
    void testCreateBooking_EventIsNull() {
        Long touristId = 1L;
        Long seasonId = 1L;
        Long packageId = 14L;

        BookingDTO request = new BookingDTO();
        request.setTouristId(touristId);
        request.setSeasonId(seasonId);
        request.setSelectedPackageId(packageId);
        request.setSelectedEventId(null);
        request.setPassengerCount(2);
        request.setBookingDate(LocalDate.now());
        request.setArrivalTime(LocalTime.of(9, 30));

        Tourist tourist = new Tourist();
        Season season = new Season();
        TourPackage tourPackage = new TourPackage();

        VehicleDTO vehicleDTO = new VehicleDTO();
        vehicleDTO.setId(1L);
        vehicleDTO.setType("Wagon R");

        Vehicle vehicle = new Vehicle();
        vehicle.setId(1L);
        vehicle.setType("Wagon R");

        VehiclePackage vehiclePackage = new VehiclePackage();
        vehiclePackage.setId(20L);
        vehiclePackage.setTotalPrice(980);
        vehiclePackage.setVehicle(vehicle);

        when(touristRepository.findById(touristId)).thenReturn(Optional.of(tourist));
        when(seasonRepository.findById(seasonId)).thenReturn(Optional.of(season));
        when(packageRepository.findById(packageId)).thenReturn(Optional.of(tourPackage));
        when(vehiclePackageService.suggestVehicleCombination(packageId, 2))
                .thenReturn(Collections.singletonList(vehicleDTO));
        when(vehiclePackageRepository.findByTourPackageIdAndVehicleId(packageId, 1L))
                .thenReturn(Optional.of(vehiclePackage));

        Booking savedBooking = new Booking();
        savedBooking.setOverallTotalPrice(980);
        savedBooking.setPassengerCount(2);
        savedBooking.setBookingDate(request.getBookingDate());
        savedBooking.setArrivalTime(request.getArrivalTime());
        savedBooking.setStatus("PENDING");
        savedBooking.setCreatedAt(LocalDateTime.now());

        when(bookingRepository.save(any(Booking.class))).thenReturn(savedBooking);

        BookingDTO result = bookingService.createBooking(request);

        assertNotNull(result);
        assertEquals(980, result.getOverallTotalPrice());
        assertEquals(2, result.getPassengerCount());
        assertEquals("PENDING", result.getStatus());
        verify(notificationService, times(1)).notifyGuideNewBooking(any(Booking.class));
    }

}
