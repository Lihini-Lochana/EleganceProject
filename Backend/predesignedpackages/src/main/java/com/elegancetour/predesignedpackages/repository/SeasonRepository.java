package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {
}
