package com.elegancetour.predesignedpackages.service;

import com.elegancetour.predesignedpackages.dto.VehicleDTO;
import com.elegancetour.predesignedpackages.entity.Vehicle;
import com.elegancetour.predesignedpackages.repository.VehicleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ModelMapper modelMapper;

    public VehicleDTO createVehicle(VehicleDTO vehicleDTO) {
        Vehicle vehicle = convertToEntity(vehicleDTO);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return convertToDTO(savedVehicle);
    }

    public VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO) {
        Optional<Vehicle> existingVehicle = vehicleRepository.findById(id);
        if (existingVehicle.isPresent()) {
            Vehicle vehicle = existingVehicle.get();
            vehicle.setType(vehicleDTO.getType());
            vehicle.setMinPassengers(vehicleDTO.getMinPassengers());
            vehicle.setMaxPassengers(vehicleDTO.getMaxPassengers());
            vehicle.setImageUrl(vehicleDTO.getImageUrl());
            Vehicle updatedVehicle = vehicleRepository.save(vehicle);
            return convertToDTO(updatedVehicle);
        }
        return null;
    }

    public VehicleDTO getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }




    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }


    private VehicleDTO convertToDTO(Vehicle vehicle) {
        return modelMapper.map(vehicle, VehicleDTO.class);
    }

    private Vehicle convertToEntity(VehicleDTO vehicleDTO) {
        return modelMapper.map(vehicleDTO, Vehicle.class);
    }
}
