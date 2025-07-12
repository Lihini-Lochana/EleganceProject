package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.PackagePlaceDTO;
import com.elegancetour.predesignedpackages.dto.TourPackageDTO;
import com.elegancetour.predesignedpackages.dto.VehiclePackageDTO;
import com.elegancetour.predesignedpackages.entity.*;
import com.elegancetour.predesignedpackages.repository.*;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TourPackageService {

    @Autowired
    private TourPackageRepository tourPackageRepository;
    @Autowired
    private SeasonRepository seasonRepository;
    @Autowired
    private PackagePlaceRepository packagePlaceRepository;
    @Autowired
    private VehiclePackageRepository vehiclePackageRepository;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private PackagePlaceService packagePlaceService;
    @Autowired
    private VehiclePackageService vehiclePackageService;
    @Autowired
    private ModelMapper modelMapper;

    public List<TourPackageDTO> getAllTourPackages() {
        return tourPackageRepository.findAll()
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TourPackageDTO> getTourPackagesBySeason(Long seasonId) {
        return tourPackageRepository.findBySeasonId(seasonId)
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TourPackageDTO createTourPackage(TourPackageDTO dto) {
        TourPackage tourPackage = convertToEntity(dto);
        return convertToDTO(tourPackageRepository.save(tourPackage));
    }

    public TourPackageDTO getTourPackageById(Long id) {
        return tourPackageRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Tour Package not found"));
    }

    public void deleteTourPackage(Long id) {
        tourPackageRepository.deleteById(id);
    }


    public TourPackageDTO updateTourPackage(Long id, TourPackageDTO dto) {
        TourPackage existingTourPackage = tourPackageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour Package not found"));

        existingTourPackage.setName(dto.getName());
        existingTourPackage.setTotalKilometers(dto.getTotalKilometers());
        existingTourPackage.setNights(dto.getNights());
        existingTourPackage.setPickupLocation(dto.getPickupLocation());
        existingTourPackage.setDropLocation(dto.getDropLocation());

        Season season = seasonRepository.findById(dto.getSeasonId())
                .orElseThrow(() -> new RuntimeException("Season not found"));
        existingTourPackage.setSeason(season);

        if (dto.getPackagePlaces() != null) {
            for (PackagePlaceDTO placeDTO : dto.getPackagePlaces()) {
                packagePlaceService.updatePackagePlace(placeDTO.getId(), placeDTO);
            }
        }

        if (dto.getVehiclePackages() != null) {
            for (VehiclePackageDTO vehicleDTO : dto.getVehiclePackages()) {
                vehiclePackageService.updateVehiclePackage(vehicleDTO.getId(), vehicleDTO);
            }
        }

        TourPackage updatedTourPackage = tourPackageRepository.save(existingTourPackage);

        return convertToDTO(updatedTourPackage);
    }

    private TourPackage convertToEntity(TourPackageDTO dto) {
        TourPackage tourPackage = modelMapper.map(dto, TourPackage.class);

        Season season = seasonRepository.findById(dto.getSeasonId())
                .orElseThrow(() -> new RuntimeException("Season not found"));
        tourPackage.setSeason(season);

        List<PackagePlace> packagePlaces = dto.getPackagePlaces() != null ? dto.getPackagePlaces().stream()
                .map(placeDTO -> {
                    Place place = placeRepository.findById(placeDTO.getPlaceId())
                            .orElseThrow(() -> new RuntimeException("Place not found"));

                    PackagePlace packagePlace = modelMapper.map(placeDTO, PackagePlace.class);
                    packagePlace.setTourPackage(tourPackage);
                    packagePlace.setPlace(place);
                    return packagePlace;
                })
                .collect(Collectors.toList()) : List.of();

        validatePackagePlaces(tourPackage, packagePlaces);

        tourPackage.setPackagePlaces(packagePlaces);

        List<VehiclePackage> vehiclePackages = dto.getVehiclePackages() != null ? dto.getVehiclePackages().stream()
                .map(vehicleDTO -> {
                    Vehicle vehicle = vehicleRepository.findById(vehicleDTO.getVehicleId())
                            .orElseThrow(() -> new RuntimeException("Vehicle not found"));

                    VehiclePackage vehiclePackage = modelMapper.map(vehicleDTO, VehiclePackage.class);
                    vehiclePackage.setTourPackage(tourPackage);
                    vehiclePackage.setVehicle(vehicle);
                    return vehiclePackage;
                })
                .collect(Collectors.toList()) : List.of();

        tourPackage.setVehiclePackages(vehiclePackages);

        return tourPackage;
    }

    private void validatePackagePlaces(TourPackage tourPackage, List<PackagePlace> packagePlaces) {
        int totalDuration = packagePlaces.stream()
                .mapToInt(PackagePlace::getDurationNights)
                .sum();

        if (totalDuration > tourPackage.getNights()) {
            throw new RuntimeException("Total duration of places (" + totalDuration + " nights) exceeds the package limit of "
                    + tourPackage.getNights() + " nights.");
        }
    }


    private TourPackageDTO convertToDTO(TourPackage tourPackage) {
        TourPackageDTO dto = modelMapper.map(tourPackage, TourPackageDTO.class);
        dto.setSeasonId(tourPackage.getSeason().getId());

        List<PackagePlaceDTO> placeDTOs = tourPackage.getPackagePlaces() != null ? tourPackage.getPackagePlaces().stream()
                .map(place -> modelMapper.map(place, PackagePlaceDTO.class))
                .collect(Collectors.toList()) : List.of();
        dto.setPackagePlaces(placeDTOs);

        List<VehiclePackageDTO> vehicleDTOs = tourPackage.getVehiclePackages() != null ? tourPackage.getVehiclePackages().stream()
                .map(vehicle -> modelMapper.map(vehicle, VehiclePackageDTO.class))
                .collect(Collectors.toList()) : List.of();
        dto.setVehiclePackages(vehicleDTOs);

        return dto;
    }

}
