package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.Guide;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GuideRepository extends JpaRepository<Guide, Long> {

    Optional<Guide> findByEmail(String email);

    Optional<Guide> findByName(String name);
}
