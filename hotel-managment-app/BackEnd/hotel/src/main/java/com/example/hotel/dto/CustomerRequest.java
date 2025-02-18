package com.example.hotel.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class CustomerRequest {

    @NotBlank(message = "Το όνομα είναι υποχρεωτικό.")
    private String name;

    @NotBlank(message = "Το email είναι υποχρεωτικό.")
    @Email(message = "Το email δεν είναι έγκυρο.")
    private String email;

    @NotBlank(message = "Το τηλέφωνο είναι υποχρεωτικό.")
    @Pattern(regexp = "\\d{10}", message = "Το τηλέφωνο πρέπει να αποτελείται από 10 αριθμητικά ψηφία χωρίς κενά ή σύμβολα.")
	private String phone;

    // Getters και Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
