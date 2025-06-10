package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
