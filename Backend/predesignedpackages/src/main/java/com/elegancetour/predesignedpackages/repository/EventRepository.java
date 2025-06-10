package com.elegancetour.predesignedpackages.repository;

import com.elegancetour.predesignedpackages.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
