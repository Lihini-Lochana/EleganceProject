package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.GuideNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GuideNotificationRepository extends JpaRepository<GuideNotification, Long> {
    List<GuideNotification> findByGuideId(Long guideId);
}

