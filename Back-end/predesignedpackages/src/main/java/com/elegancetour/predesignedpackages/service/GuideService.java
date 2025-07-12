package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.GuideDTO;
import com.elegancetour.predesignedpackages.entity.Guide;
import com.elegancetour.predesignedpackages.repository.GuideRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GuideService {

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private ModelMapper modelMapper;

    public GuideDTO createGuide(GuideDTO guideDTO) {
        Guide guide = modelMapper.map(guideDTO, Guide.class);
        Guide savedGuide = guideRepository.save(guide);
        return convertToDTO(savedGuide);
    }

    public List<GuideDTO> getAllGuides() {
        return guideRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public GuideDTO getGuideById(Long id) {
        Guide guide = guideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guide not found with id: " + id));
        return convertToDTO(guide);
    }

    public GuideDTO getGuideByEmail(String email) {
        Guide guide = guideRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Guide not found with email: " + email));
        return convertToDTO(guide);
    }

    public GuideDTO getGuideByName(String name) {
        Guide guide = guideRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Guide not found with name: " + name));
        return convertToDTO(guide);
    }

    public GuideDTO updateGuide(Long id, GuideDTO guideDTO) {
        Optional<Guide> optionalGuide = guideRepository.findById(id);
        if (optionalGuide.isPresent()) {
            Guide guide = optionalGuide.get();
            guide.setName(guideDTO.getName());
            guide.setEmail(guideDTO.getEmail());
            guide.setPhone(guideDTO.getPhone());
            guide.setImageUrl(guideDTO.getImageUrl());
            guide.setAddress(guideDTO.getAddress());
            Guide updatedGuide = guideRepository.save(guide);
            return convertToDTO(updatedGuide);
        } else {
            throw new RuntimeException("Guide not found");
        }
    }

    public void deleteGuide(Long id) {
        if (!guideRepository.existsById(id)) {
            throw new RuntimeException("Guide not found");
        }
        guideRepository.deleteById(id);
    }

    private GuideDTO convertToDTO(Guide guide) {
        return modelMapper.map(guide, GuideDTO.class);
    }

    private Guide convertToEntity(GuideDTO guideDTO) {
        return modelMapper.map(guideDTO, Guide.class);
    }
}
