package com.example.hotel.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class ReservationRequest {
	
    @NotNull(message = "Το τηλέφωνο είναι υποχρεωτικό.")
    @Pattern(regexp = "\\d{10}", message = "Το τηλέφωνο πρέπει να αποτελείται από 10 ψηφία.")
	@JsonProperty("phone")
    private String phone;
    
	@Min(value = 1, message = "Ο αριθμός ατόμων πρέπει να είναι τουλάχιστον 1.")
    @JsonProperty("num_people")
    private int numPeople;
    
	@NotNull(message = "Η ημερομηνία άφιξης είναι υποχρεωτική.")
    @JsonProperty("check_in_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkInDate;
    
	@NotNull(message = "Η ημερομηνία αναχώρησης είναι υποχρεωτική.")
    @JsonProperty("check_out_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
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
