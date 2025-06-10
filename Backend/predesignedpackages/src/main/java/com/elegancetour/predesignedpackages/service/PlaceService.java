package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.PlaceDTO;
import com.elegancetour.predesignedpackages.entity.Place;
import com.elegancetour.predesignedpackages.repository.PlaceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ModelMapper modelMapper;

    public PlaceDTO createPlace(PlaceDTO placeDTO) {
        Place place = modelMapper.map(placeDTO, Place.class);
        Place savedPlace = placeRepository.save(place);
        return convertToDTO(savedPlace);
    }

    public List<PlaceDTO> getAllPlaces() {
        return placeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PlaceDTO getPlaceById(Long id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found"));
        return convertToDTO(place);
    }

    public PlaceDTO updatePlace(Long id, PlaceDTO placeDTO) {
        Optional<Place> existingPlace = placeRepository.findById(id);
        if (existingPlace.isPresent()) {
            Place place = existingPlace.get();
            place.setName(placeDTO.getName());
            place.setDescription(placeDTO.getDescription());
            place.setImageUrl(placeDTO.getImageUrl());
            Place updatedPlace = placeRepository.save(place);
            return convertToDTO(updatedPlace);
        } else {
            throw new RuntimeException("Place not found");
        }
    }

    public void deletePlace(Long id) {
        if (!placeRepository.existsById(id)) {
            throw new RuntimeException("Place not found");
        }
        placeRepository.deleteById(id);
    }

    private PlaceDTO convertToDTO(Place place) {
        return modelMapper.map(place, PlaceDTO.class);
    }

    private Place convertToEntity(PlaceDTO placeDTO) {
        return modelMapper.map(placeDTO, Place.class);
    }
}
