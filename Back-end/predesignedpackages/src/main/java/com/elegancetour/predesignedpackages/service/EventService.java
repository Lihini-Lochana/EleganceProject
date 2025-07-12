package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.EventDTO;
import com.elegancetour.predesignedpackages.entity.Event;
import com.elegancetour.predesignedpackages.repository.EventRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;

    private EventDTO convertToDTO(Event event) {
        return modelMapper.map(event, EventDTO.class);
    }

    private Event convertToEntity(EventDTO eventDTO) {
        return modelMapper.map(eventDTO, Event.class);
    }

    public EventDTO createEvent(EventDTO eventDTO) {
        Event event = convertToEntity(eventDTO);
        Event savedEvent = eventRepository.save(event);
        return convertToDTO(savedEvent);
    }

    public List<EventDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public EventDTO getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return convertToDTO(event);
    }

    public EventDTO getSelectedEventById(Long id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            return convertToDTO(event.get()); // Assuming you have a method to convert Event to EventDTO
        } else {
            return null;
        }
    }

    public EventDTO updateEvent(Long id, EventDTO eventDTO) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        existingEvent.setName(eventDTO.getName());
        existingEvent.setImageUrl(eventDTO.getImageUrl());
        existingEvent.setDescription(eventDTO.getDescription());
        existingEvent.setPrice(eventDTO.getPrice());

        Event updatedEvent = eventRepository.save(existingEvent);
        return convertToDTO(updatedEvent);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
