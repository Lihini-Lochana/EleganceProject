package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.TouristNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TouristNotificationRepository extends JpaRepository<TouristNotification, Long> {
    List<TouristNotification> findByTouristId(Long touristId);
}

