package com.example.hotel.controller;

import com.example.hotel.dto.CustomerRequest;
import com.example.hotel.entity.Customer;
import com.example.hotel.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<?> createCustomer(@Valid @RequestBody CustomerRequest request, BindingResult result) {
        // Εάν υπάρχουν σφάλματα επικύρωσης, συγκεντρώνονται τα μηνύματα
        if (result.hasErrors()) {
            String errors = result.getFieldErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(" "));
            return ResponseEntity.badRequest().body(errors);
        }

        // Έλεγχος για υπάρχοντα δεδομένα (π.χ., ήδη υπάρχει πελάτης με το ίδιο τηλέφωνο ή email)
        if (customerRepository.existsByPhone(request.getPhone())) {
            return ResponseEntity.badRequest().body("Υπάρχει ήδη πελάτης με το συγκεκριμένο τηλέφωνο.");
        }
        if (customerRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Υπάρχει ήδη πελάτης με το συγκεκριμένο email.");
        }

        // Μετατροπή του DTO σε οντότητα
        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());

        Customer savedCustomer = customerRepository.save(customer);
        return ResponseEntity.ok(savedCustomer);
    }
}
