package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.PlaceDTO;
import com.elegancetour.predesignedpackages.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @PostMapping
    public PlaceDTO createPlace(@RequestBody PlaceDTO placeDTO) {
        return placeService.createPlace(placeDTO);
    }

    @GetMapping
    public List<PlaceDTO> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    @GetMapping("/{id}")
    public PlaceDTO getPlaceById(@PathVariable Long id) {
        return placeService.getPlaceById(id);
    }

    @PutMapping("/{id}")
    public PlaceDTO updatePlace(@PathVariable Long id, @RequestBody PlaceDTO placeDTO) {
        return placeService.updatePlace(id, placeDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Long id) {
        placeService.deletePlace(id);
    }

    @Value("${image.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload-place-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("No file selected", HttpStatus.BAD_REQUEST);
        }

        try {
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            Path path = Paths.get(uploadDir + filename);

            Files.createDirectories(path.getParent());

            file.transferTo(path);

            String imageUrl = "/images/" + filename;
            return new ResponseEntity<>(imageUrl, HttpStatus.OK);

        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        File file = new File(uploadDir + File.separator + imageName); // Ensure proper file path
        if (file.exists()) {
            byte[] image = Files.readAllBytes(file.toPath());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // or IMAGE_PNG based on file type
            return new ResponseEntity<>(image, headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
