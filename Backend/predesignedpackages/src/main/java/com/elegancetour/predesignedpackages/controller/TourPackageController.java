package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.TourPackageDTO;
import com.elegancetour.predesignedpackages.service.TourPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tour-packages")
public class TourPackageController {

    @Autowired
    private TourPackageService tourPackageService;

    @GetMapping
    public List<TourPackageDTO> getAllTourPackages() {
        return tourPackageService.getAllTourPackages();
    }

    @GetMapping("/{id}")
    public TourPackageDTO getTourPackageById(@PathVariable Long id) {
        return tourPackageService.getTourPackageById(id);
    }

    @GetMapping("/season/{seasonId}")
    public List<TourPackageDTO> getTourPackagesBySeason(@PathVariable Long seasonId) {
        return tourPackageService.getTourPackagesBySeason(seasonId);
    }

    @PostMapping
    public TourPackageDTO createTourPackage(@RequestBody TourPackageDTO tourPackageDTO) {
        return tourPackageService.createTourPackage(tourPackageDTO);
    }

    @PutMapping("/{id}")
    public TourPackageDTO updateTourPackage(@PathVariable Long id, @RequestBody TourPackageDTO tourPackageDTO) {
        return tourPackageService.updateTourPackage(id, tourPackageDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTourPackage(@PathVariable Long id) {
        tourPackageService.deleteTourPackage(id);
    }
}
