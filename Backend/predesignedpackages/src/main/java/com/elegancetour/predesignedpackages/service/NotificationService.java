package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.entity.*;
import com.elegancetour.predesignedpackages.repository.GuideNotificationRepository;
import com.elegancetour.predesignedpackages.repository.GuideRepository;
import com.elegancetour.predesignedpackages.repository.TouristNotificationRepository;
import com.elegancetour.predesignedpackages.repository.TouristRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private TouristRepository touristRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private TouristNotificationRepository touristNotificationRepository;

    @Autowired
    private GuideNotificationRepository guideNotificationRepository;

    public void sendNotificationToTourist(Long touristId, String message, Booking booking) {
        Tourist tourist = touristRepository.findById(touristId)
                .orElseThrow(() -> new RuntimeException("Tourist not found with ID: " + touristId));

        TouristNotification notification = new TouristNotification();
        notification.setTourist(tourist);
        notification.setMessage(message);
        notification.setBooking(booking);
        touristNotificationRepository.save(notification);
    }

    public void sendNotificationToGuide(Long guideId, String message, Booking booking) {
        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new RuntimeException("Guide not found with ID: " + guideId));

        GuideNotification notification = new GuideNotification();
        notification.setGuide(guide);
        notification.setMessage(message);
        notification.setBooking(booking);
        guideNotificationRepository.save(notification);
    }

    public void notifyGuideNewBooking(Booking booking) {
        List<Guide> guides = guideRepository.findAll();
        for (Guide guide : guides) {
            sendNotificationToGuide(guide.getId(),
                    "New booking placed. Please review it.", booking);
        }
    }

    public void notifyGuideBookingCancelled(Booking booking) {
        List<Guide> guides = guideRepository.findAll();
        for (Guide guide : guides) {
            sendNotificationToGuide(guide.getId(),
                    "Booking was cancelled. Reason: " + booking.getCancelReason(), booking);
        }
    }



    public void markTouristNotificationAsRead(Long notificationId) {
        TouristNotification notification = touristNotificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Tourist Notification not found"));
        notification.setRead(true);
        touristNotificationRepository.save(notification);
    }

    public void markGuideNotificationAsRead(Long notificationId) {
        GuideNotification notification = guideNotificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Guide Notification not found"));
        notification.setRead(true);
        guideNotificationRepository.save(notification);
    }


    public void notifyTouristBookingAccepted(Booking booking) {
        sendNotificationToTourist(booking.getTourist().getId(),
                "Your booking (ID: " + booking.getId() + ") has been ACCEPTED.", booking);
    }

    public void notifyTouristBookingRejected(Booking booking, String reason) {
        sendNotificationToTourist(booking.getTourist().getId(),
                "Your booking (ID: " + booking.getId() + ") was REJECTED. Reason: " + reason, booking);
    }

    public List<TouristNotification> getNotificationsForTourist(Long touristId) {
        return touristNotificationRepository.findByTouristId(touristId);
    }

    public List<GuideNotification> getNotificationsForGuide(Long guideId) {
        return guideNotificationRepository.findByGuideId(guideId);
    }

}

