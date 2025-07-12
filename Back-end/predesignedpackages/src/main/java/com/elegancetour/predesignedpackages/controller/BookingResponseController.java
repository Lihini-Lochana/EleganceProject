package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.BookingResponseDTO;
import com.elegancetour.predesignedpackages.entity.BookingResponse;
import com.elegancetour.predesignedpackages.repository.BookingResponseRepository;
import com.elegancetour.predesignedpackages.service.BookingResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/booking-responses")
public class BookingResponseController {

    @Autowired
    private BookingResponseService bookingResponseService;


    @PostMapping("/accept")
    public BookingResponseDTO createAcceptedResponse(@RequestBody BookingResponseDTO bookingResponseDTO) {
        return bookingResponseService.createAcceptedResponse(bookingResponseDTO);
    }

    @PostMapping("/reject/{bookingId}")
    public BookingResponseDTO rejectBooking(@PathVariable Long bookingId, @RequestParam String rejectReason) {
        return bookingResponseService.rejectBooking(bookingId, rejectReason);
    }

    @GetMapping("/{bookingId}")
    public BookingResponseDTO getBookingResponseByBookingId(@PathVariable Long bookingId) {
        return bookingResponseService.getByBookingId(bookingId);
    }
}
