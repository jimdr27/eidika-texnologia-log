package com.example.hotel.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import java.time.LocalDate;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Χρησιμοποιούμε το customer_phone για να πάρουμε το τηλέφωνο από το Customer
    @ManyToOne
    @JoinColumn(name = "customer_phone", referencedColumnName = "phone", nullable = false)
    private Customer customer;
	@JoinColumn(name = "phone", nullable = false) // Το phone είναι υποχρεωτικό
    private String phone;
    private int numPeople;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    // Getters και Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
	public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
