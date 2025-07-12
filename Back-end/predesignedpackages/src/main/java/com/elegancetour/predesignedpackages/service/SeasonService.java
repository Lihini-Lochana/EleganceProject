package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.SeasonDTO;
import com.elegancetour.predesignedpackages.entity.Season;
import com.elegancetour.predesignedpackages.repository.SeasonRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeasonService {
    @Autowired
    private SeasonRepository seasonRepository;

    @Autowired
    private ModelMapper modelMapper;

    public SeasonDTO createSeason(SeasonDTO seasonDTO) {
        Season season = convertToEntity(seasonDTO);
        Season savedSeason = seasonRepository.save(season);
        return convertToDTO(savedSeason);
    }

    public List<SeasonDTO> getAllSeasons() {
        return seasonRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SeasonDTO getSeasonById(Long id) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Season not found!"));
        return convertToDTO(season);
    }

    public void deleteSeason(Long id) {
        if (!seasonRepository.existsById(id)) {
            throw new RuntimeException("Season not found!");
        }
        seasonRepository.deleteById(id);
    }

    private Season convertToEntity(SeasonDTO seasonDTO) {
        return modelMapper.map(seasonDTO, Season.class);
    }

    private SeasonDTO convertToDTO(Season season) {
        return modelMapper.map(season, SeasonDTO.class);
    }
}
