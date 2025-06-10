package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.SeasonDTO;
import com.elegancetour.predesignedpackages.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/seasons")
public class SeasonController {

    @Autowired
    private SeasonService seasonService;

    @PostMapping
    public SeasonDTO createSeason(@RequestBody SeasonDTO seasonDTO) {
        return seasonService.createSeason(seasonDTO);
    }

    @GetMapping
    public List<SeasonDTO> getAllSeasons() {
        return seasonService.getAllSeasons();
    }

    @GetMapping("/{id}")
    public SeasonDTO getSeasonById(@PathVariable Long id) {
        return seasonService.getSeasonById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteSeason(@PathVariable Long id) {
        seasonService.deleteSeason(id);
    }
}
