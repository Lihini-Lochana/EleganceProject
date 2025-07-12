package com.elegancetour.predesignedpackages.repository;


import com.elegancetour.predesignedpackages.entity.BookingResponse;
import com.elegancetour.predesignedpackages.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingResponseRepository extends JpaRepository<BookingResponse, Long> {
    Optional<BookingResponse> findByBookingId(Long bookingId);

}

