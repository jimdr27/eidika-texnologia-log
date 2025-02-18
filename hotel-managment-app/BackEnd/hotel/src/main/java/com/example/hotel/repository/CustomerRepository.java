package com.example.hotel.repository;

import com.example.hotel.entity.Customer; // Βεβαιωθείτε ότι αυτός είναι ο σωστός φάκελος
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	Optional<Customer> findByPhone(String phone);
    boolean existsByPhone(String phone);
	boolean existsByEmail(String email);
	

}
