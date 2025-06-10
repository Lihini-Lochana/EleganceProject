package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.PackagePlaceDTO;
import com.elegancetour.predesignedpackages.service.PackagePlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/package-places")
public class PackagePlaceController {

    @Autowired
    private PackagePlaceService packagePlaceService;

    @PostMapping
    public PackagePlaceDTO createPackagePlace(@RequestBody PackagePlaceDTO packagePlaceDTO) {
        return packagePlaceService.createPackagePlace(packagePlaceDTO);
    }

    @GetMapping
    public List<PackagePlaceDTO> getAllPackagePlaces() {
        return packagePlaceService.getAllPackagePlaces();
    }

    @GetMapping("/{id}")
    public PackagePlaceDTO getPackagePlaceById(@PathVariable Long id) {
        return packagePlaceService.getPackagePlaceById(id);
    }

    @GetMapping("/tour-package/{tourPackageId}")
    public List<PackagePlaceDTO> getPackagePlacesByTourPackageId(@PathVariable Long tourPackageId) {
        return packagePlaceService.getPackagePlacesByTourPackageId(tourPackageId);
    }

    @PutMapping("/{id}")
    public PackagePlaceDTO updatePackagePlace(@PathVariable Long id, @RequestBody PackagePlaceDTO packagePlaceDTO) {
        return packagePlaceService.updatePackagePlace(id, packagePlaceDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePackagePlace(@PathVariable Long id) {
        packagePlaceService.deletePackagePlace(id);
    }
}
