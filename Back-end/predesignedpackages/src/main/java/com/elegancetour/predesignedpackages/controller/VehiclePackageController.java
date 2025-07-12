package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.VehicleDTO;
import com.elegancetour.predesignedpackages.dto.VehiclePackageDTO;
import com.elegancetour.predesignedpackages.service.VehiclePackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/vehicle-packages")
public class VehiclePackageController {

    @Autowired
    private VehiclePackageService vehiclePackageService;

    @PostMapping
    public VehiclePackageDTO createVehiclePackage(@RequestBody VehiclePackageDTO vehiclePackageDTO) {
        return vehiclePackageService.createVehiclePackage(vehiclePackageDTO);
    }

    @GetMapping("/{id}")
    public VehiclePackageDTO getVehiclePackageById(@PathVariable Long id) {
        return vehiclePackageService.getVehiclePackageById(id);
    }

    @GetMapping("/tour-package/{tourPackageId}")
    public List<VehiclePackageDTO> getVehiclePackagesByTourPackageId(@PathVariable Long tourPackageId) {
        return vehiclePackageService.getVehiclePackagesByTourPackageId(tourPackageId);
    }

    @GetMapping("/suggest-vehicles/{packageId}/{passengers}")
    public ResponseEntity<List<VehicleDTO>> suggestVehicles(@PathVariable Long packageId, @PathVariable int passengers) {

        List<VehicleDTO> vehicles = vehiclePackageService.suggestVehicleCombination(packageId, passengers);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping
    public List<VehiclePackageDTO> getAllVehiclePackages() {
        return vehiclePackageService.getAllVehiclePackages();
    }

    @PutMapping("/{id}")
    public VehiclePackageDTO updateVehiclePackage(@PathVariable Long id, @RequestBody VehiclePackageDTO vehiclePackageDTO) {
        return vehiclePackageService.updateVehiclePackage(id, vehiclePackageDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteVehiclePackage(@PathVariable Long id) {
        vehiclePackageService.deleteVehiclePackage(id);
    }

    @PostMapping("/by-ids")
    public List<VehiclePackageDTO> getVehiclePackagesByIds(@RequestBody List<Long> ids) {
        return vehiclePackageService.getVehiclePackagesByIds(ids);
    }
}
