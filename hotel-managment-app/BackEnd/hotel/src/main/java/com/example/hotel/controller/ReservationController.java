package com.example.hotel.controller;

import com.example.hotel.entity.Reservation;
import com.example.hotel.entity.Customer;
import com.example.hotel.repository.ReservationRepository;
import com.example.hotel.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.example.hotel.dto.ReservationRequest;
import javax.validation.Valid;
import java.util.stream.Collectors;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationRequest request, BindingResult result) {
        // Εκτύπωση για έλεγχο των παραμέτρων που παραλαμβάνονται
        System.out.println("Received check-in date: " + request.getCheckInDate());
        System.out.println("Received check-out date: " + request.getCheckOutDate());
        System.out.println("Received number of people: " + request.getNumPeople());
        System.out.println("Received phone: " + request.getPhone());
		
		// Συλλογή μηνυμάτων επικύρωσης εάν υπάρχουν σφάλματα
        if (result.hasErrors()) {
            String errors = result.getFieldErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(" "));
            return ResponseEntity.badRequest().body(errors);
        }
		
		// Έλεγχος αν υπάρχει ο πελάτης με το τηλέφωνο
		if (!customerRepository.existsByPhone(request.getPhone())) {
        return ResponseEntity.badRequest().body("Δεν βρέθηκε πελάτης με αυτό το τηλέφωνο: " + request.getPhone());
		}
		
        // Εύρεση του πελάτη μέσω του τηλεφώνου
        Optional<Customer> customerOpt = customerRepository.findByPhone(request.getPhone());
        if (customerOpt.isEmpty()) {
            throw new RuntimeException("Customer not found");
        }
        Customer customer = customerOpt.get();

        // Δημιουργία και αποθήκευση της κράτησης
        Reservation reservation = new Reservation();
        reservation.setCustomer(customer);
        reservation.setNumPeople(request.getNumPeople());
        reservation.setCheckInDate(request.getCheckInDate());
        reservation.setCheckOutDate(request.getCheckOutDate());

        Reservation savedReservation = reservationRepository.save(reservation);
        return ResponseEntity.ok(savedReservation);
    }

    // DTO για το αίτημα κράτησης
    public static class ReservationRequest {
        // Χρησιμοποιούμε τα JSON annotations ώστε να αντιστοιχιστούν σωστά τα keys
        @com.fasterxml.jackson.annotation.JsonProperty("phone")
        private String phone;

        @com.fasterxml.jackson.annotation.JsonProperty("num_people")
        private int numPeople;

        @com.fasterxml.jackson.annotation.JsonProperty("check_in_date")
        @com.fasterxml.jackson.annotation.JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate checkInDate;

        @com.fasterxml.jackson.annotation.JsonProperty("check_out_date")
        @com.fasterxml.jackson.annotation.JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate checkOutDate;

        // Getters και Setters
        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public int getNumPeople() {
            return numPeople;
        }

        public void setNumPeople(int numPeople) {
            this.numPeople = numPeople;
        }

        public LocalDate getCheckInDate() {
            return checkInDate;
        }

        public void setCheckInDate(LocalDate checkInDate) {
            this.checkInDate = checkInDate;
        }

        public LocalDate getCheckOutDate() {
            return checkOutDate;
        }

        public void setCheckOutDate(LocalDate checkOutDate) {
            this.checkOutDate = checkOutDate;
        }
    }
}
