package com.example.hotel.controller;

import com.example.hotel.entity.Reservation;
import com.example.hotel.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.hotel.dto.AdminLoginRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "1234";

    @Autowired
    private ReservationRepository reservationRepository;

    private boolean isAuthenticated = false;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminLoginRequest request) {
        if (ADMIN_USERNAME.equals(request.getUsername()) && ADMIN_PASSWORD.equals(request.getPassword())) {
            isAuthenticated = true;
            return ResponseEntity.ok("Επιτυχής σύνδεση!");
        }
        return ResponseEntity.status(403).body("Λάθος όνομα χρήστη ή κωδικός.");
    }

    @GetMapping("/reservations")
    public ResponseEntity<?> getReservations() {
        if (!isAuthenticated) {
            return ResponseEntity.status(403).body("Δεν έχετε συνδεθεί.");
        }
        List<Reservation> reservations = reservationRepository.findAll();
        return ResponseEntity.ok(reservations);
    }

    @DeleteMapping("/reservations/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        if (!isAuthenticated) {
            return ResponseEntity.status(403).body("Δεν έχετε συνδεθεί.");
        }
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            reservationRepository.deleteById(id);
            return ResponseEntity.ok("Η κράτηση με ID " + id + " ακυρώθηκε.");
        }
        return ResponseEntity.status(404).body("Η κράτηση δεν βρέθηκε.");
    }
}
