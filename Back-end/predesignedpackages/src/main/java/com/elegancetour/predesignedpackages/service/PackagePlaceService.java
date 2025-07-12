package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.PackagePlaceDTO;
import com.elegancetour.predesignedpackages.entity.PackagePlace;
import com.elegancetour.predesignedpackages.entity.Place;
import com.elegancetour.predesignedpackages.entity.TourPackage;
import com.elegancetour.predesignedpackages.repository.PackagePlaceRepository;
import com.elegancetour.predesignedpackages.repository.PlaceRepository;
import com.elegancetour.predesignedpackages.repository.TourPackageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PackagePlaceService {

    @Autowired
    private PackagePlaceRepository packagePlaceRepository;

    @Autowired
    private TourPackageRepository tourPackageRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ModelMapper modelMapper;

    public PackagePlaceDTO createPackagePlace(PackagePlaceDTO packagePlaceDTO) {
        PackagePlace packagePlace = convertToEntity(packagePlaceDTO);

        PackagePlace savedPackagePlace = packagePlaceRepository.save(packagePlace);

        return convertToDTO(savedPackagePlace);
    }

    public List<PackagePlaceDTO> getAllPackagePlaces() {
        return packagePlaceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PackagePlaceDTO getPackagePlaceById(Long id) {
        PackagePlace packagePlace = packagePlaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PackagePlace not found"));
        return convertToDTO(packagePlace);
    }

    public List<PackagePlaceDTO> getPackagePlacesByTourPackageId(Long tourPackageId) {
        TourPackage tourPackage = tourPackageRepository.findById(tourPackageId)
                .orElseThrow(() -> new RuntimeException("TourPackage not found"));
        List<PackagePlace> packagePlaces = packagePlaceRepository.findByTourPackage(tourPackage);
        return packagePlaces.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PackagePlaceDTO updatePackagePlace(Long id, PackagePlaceDTO packagePlaceDTO) {
        PackagePlace existingPackagePlace = packagePlaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PackagePlace not found"));

        PackagePlace updatedPackagePlace = convertToEntity(packagePlaceDTO);
        updatedPackagePlace.setId(existingPackagePlace.getId());
        updatedPackagePlace.setDurationNights(existingPackagePlace.getDurationNights());

        updatedPackagePlace = packagePlaceRepository.save(updatedPackagePlace);

        return convertToDTO(updatedPackagePlace);
    }

    public void deletePackagePlace(Long id) {
        if (!packagePlaceRepository.existsById(id)) {
            throw new RuntimeException("PackagePlace not found");
        }
        packagePlaceRepository.deleteById(id);
    }

    private PackagePlace convertToEntity(PackagePlaceDTO dto) {
        TourPackage tourPackage = tourPackageRepository.findById(dto.getTourPackageId())
                .orElseThrow(() -> new RuntimeException("TourPackage not found"));
        Place place = placeRepository.findById(dto.getPlaceId())
                .orElseThrow(() -> new RuntimeException("Place not found"));

        return new PackagePlace(tourPackage, place, dto.getDurationNights());
    }

    private PackagePlaceDTO convertToDTO(PackagePlace packagePlace) {
        return modelMapper.map(packagePlace, PackagePlaceDTO.class);
    }
}
