package com.example.hotel.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String type; // Τύπος δωματίου (π.χ., μονόκλινο, δίκλινο)

    @Column(nullable = false)
    private Double price; // Τιμή ανά βραδιά

    @Column(nullable = false)
    private Boolean availability; // Διαθεσιμότητα

    // Getters και Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }
}
