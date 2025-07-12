package com.elegancetour.predesignedpackages.controller;

import com.elegancetour.predesignedpackages.dto.GuideDTO;
import com.elegancetour.predesignedpackages.service.GuideService;
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
@RequestMapping("/api/guides")
public class GuideController {

    @Autowired
    private GuideService guideService;

    @PostMapping
    public GuideDTO createGuide(@RequestBody GuideDTO guideDTO) {
        return guideService.createGuide(guideDTO);
    }

    @GetMapping("/{id}")
    public GuideDTO getGuideById(@PathVariable Long id) {
        return guideService.getGuideById(id);
    }

    @GetMapping("/email/{email}")
    public GuideDTO getGuideByEmail(@PathVariable String email) {
        return guideService.getGuideByEmail(email);
    }

    @GetMapping("/name/{name}")
    public GuideDTO getGuideByName(@PathVariable String name) {
        return guideService.getGuideByName(name);
    }

    @GetMapping
    public List<GuideDTO> getAllGuides() {
        return guideService.getAllGuides();
    }

    @PutMapping("/{id}")
    public GuideDTO updateGuide(@PathVariable Long id, @RequestBody GuideDTO guideDTO) {
        return guideService.updateGuide(id, guideDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteGuide(@PathVariable Long id) {
        guideService.deleteGuide(id);
    }

    @Value("${image.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload-guide-image")
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
        File file = new File(uploadDir + File.separator + imageName);
        if (file.exists()) {
            byte[] image = Files.readAllBytes(file.toPath());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(image, headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
