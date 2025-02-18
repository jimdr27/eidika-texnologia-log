package com.example.hotel.repository;

import com.example.hotel.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	void deleteById(Long id);
}
