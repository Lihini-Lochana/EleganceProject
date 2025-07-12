package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.TouristDTO;
import com.elegancetour.predesignedpackages.service.TouristService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tourists")
public class TouristController {

    @Autowired
    private TouristService touristService;

    @PostMapping("/create")
    public TouristDTO createTourist(@RequestBody TouristDTO touristDTO) {
        return touristService.createTourist(touristDTO);
    }

    @GetMapping("/{id}")
    public TouristDTO getTouristById(@PathVariable Long id) {
        return touristService.getTouristById(id);
    }
}
