package com.elegancetour.predesignedpackages.service;


import com.elegancetour.predesignedpackages.dto.TouristDTO;
import com.elegancetour.predesignedpackages.entity.Tourist;
import com.elegancetour.predesignedpackages.repository.TouristRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TouristService {

    @Autowired
    private TouristRepository touristRepository;

    @Autowired
    private ModelMapper modelMapper;

    private Tourist convertToEntity(TouristDTO touristDTO) {
        return modelMapper.map(touristDTO, Tourist.class);
    }

    private TouristDTO convertToDTO(Tourist tourist) {
        return modelMapper.map(tourist, TouristDTO.class);
    }

    public TouristDTO createTourist(TouristDTO touristDTO) {
        Tourist tourist = convertToEntity(touristDTO);

        Tourist savedTourist = touristRepository.save(tourist);

        return convertToDTO(savedTourist);
    }

    public TouristDTO getTouristById(Long id) {
        Tourist tourist = touristRepository.findById(id)
                .orElse(null);
        if (tourist != null) {
            return convertToDTO(tourist);
        }
        return null;
    }
}

