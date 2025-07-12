package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.GuideNotificationDTO;
import com.elegancetour.predesignedpackages.dto.TouristNotificationDTO;
import com.elegancetour.predesignedpackages.entity.GuideNotification;
import com.elegancetour.predesignedpackages.entity.TouristNotification;
import com.elegancetour.predesignedpackages.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;


    @PutMapping("/tourist/{id}/mark-read")
    public ResponseEntity<Void> markTouristNotificationAsRead(@PathVariable Long id) {
        notificationService.markTouristNotificationAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/guide/{id}/mark-read")
    public ResponseEntity<Void> markGuideNotificationAsRead(@PathVariable Long id) {
        notificationService.markGuideNotificationAsRead(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/tourist/{touristId}")
    public List<TouristNotificationDTO> getTouristNotifications(@PathVariable Long touristId) {
        List<TouristNotification> notifications = notificationService.getNotificationsForTourist(touristId);
        return notifications.stream()
                .map(TouristNotificationDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/guide/{guideId}")
    public List<GuideNotificationDTO> getGuideNotifications(@PathVariable Long guideId) {
        List<GuideNotification> notifications = notificationService.getNotificationsForGuide(guideId);
        return notifications.stream()
                .map(GuideNotificationDTO::new)
                .collect(Collectors.toList());
    }
}

