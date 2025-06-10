package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.VehicleDTO;
import com.elegancetour.predesignedpackages.dto.VehiclePackageDTO;
import com.elegancetour.predesignedpackages.entity.VehiclePackage;
import com.elegancetour.predesignedpackages.entity.TourPackage;
import com.elegancetour.predesignedpackages.entity.Vehicle;
import com.elegancetour.predesignedpackages.repository.VehiclePackageRepository;
import com.elegancetour.predesignedpackages.repository.TourPackageRepository;
import com.elegancetour.predesignedpackages.repository.VehicleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehiclePackageService {

    @Autowired
    private VehiclePackageRepository vehiclePackageRepository;
    @Autowired
    private TourPackageRepository tourPackageRepository;
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<VehiclePackageDTO> getAllVehiclePackages() {
        return vehiclePackageRepository.findAll()
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public VehiclePackageDTO getVehiclePackageById(Long id) {
        return vehiclePackageRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("VehiclePackage not found"));
    }

    public List<VehiclePackageDTO> getVehiclePackagesByTourPackageId(Long tourPackageId) {
        List<VehiclePackage> vehiclePackages = vehiclePackageRepository.findByTourPackageId(tourPackageId);
        return vehiclePackages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public VehiclePackageDTO createVehiclePackage(VehiclePackageDTO dto) {
        VehiclePackage vehiclePackage = convertToEntity(dto);
        return convertToDTO(vehiclePackageRepository.save(vehiclePackage));
    }

    public VehiclePackageDTO updateVehiclePackage(Long id, VehiclePackageDTO dto) {
        VehiclePackage existingVehiclePackage = vehiclePackageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("VehiclePackage not found"));

        existingVehiclePackage.setTotalPrice(dto.getTotalPrice());
        existingVehiclePackage.setExtraKmPrice(dto.getExtraKmPrice());

        return convertToDTO(vehiclePackageRepository.save(existingVehiclePackage));
    }

    public List<VehicleDTO> suggestVehicleCombination(Long tourPackageId, int totalPassengerCount) {
        List<VehicleDTO> selectedVehicles = new ArrayList<>();
        int remainingPassengers = totalPassengerCount;

        List<VehiclePackage> vehiclePackages = vehiclePackageRepository.findByTourPackageId(tourPackageId);

        if (vehiclePackages.isEmpty()) {
            throw new RuntimeException("No vehicle packages found for the selected tour package.");
        }

        List<VehicleDTO> availableVehicles = vehiclePackages.stream()
                .map(vp -> modelMapper.map(vp.getVehicle(), VehicleDTO.class))
                .collect(Collectors.toList());

        availableVehicles.sort((v1, v2) -> Integer.compare(v2.getMaxPassengers(), v1.getMaxPassengers()));

        while (remainingPassengers > 0) {
            VehicleDTO bestFit = null;

            for (VehicleDTO vehicle : availableVehicles) {
                if (vehicle.getMaxPassengers() <= remainingPassengers) {
                    bestFit = vehicle;
                    break;
                }
            }

            if (bestFit == null && !availableVehicles.isEmpty()) {
                bestFit = availableVehicles.get(availableVehicles.size() - 1);
            }

            if (bestFit == null) {
                throw new RuntimeException("Unable to find suitable vehicle combination.");
            }

            selectedVehicles.add(bestFit);
            remainingPassengers -= bestFit.getMaxPassengers();

            if (remainingPassengers > 0) {
                System.out.println("Please select another vehicle to accommodate the remaining passengers.");
            }
        }

        return selectedVehicles;
    }


    public void deleteVehiclePackage(Long id) {
        if (!vehiclePackageRepository.existsById(id)) {
            throw new RuntimeException("VehiclePackage not found");
        }
        vehiclePackageRepository.deleteById(id);
    }

    public List<VehiclePackageDTO> getVehiclePackagesByIds(List<Long> ids) {
        List<VehiclePackage> vehiclePackages = vehiclePackageRepository.findAllById(ids);
        return vehiclePackages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    private VehiclePackage convertToEntity(VehiclePackageDTO dto) {
        VehiclePackage vehiclePackage = modelMapper.map(dto, VehiclePackage.class);

        TourPackage tourPackage = tourPackageRepository.findById(dto.getTourPackageId())
                .orElseThrow(() -> new RuntimeException("TourPackage not found"));
        vehiclePackage.setTourPackage(tourPackage);

        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        vehiclePackage.setVehicle(vehicle);

        return vehiclePackage;
    }

    private VehiclePackageDTO convertToDTO(VehiclePackage vehiclePackage) {
        VehiclePackageDTO dto = modelMapper.map(vehiclePackage, VehiclePackageDTO.class);
        dto.setTourPackageId(vehiclePackage.getTourPackage().getId());
        dto.setVehicleId(vehiclePackage.getVehicle().getId());
        return dto;
    }
}
