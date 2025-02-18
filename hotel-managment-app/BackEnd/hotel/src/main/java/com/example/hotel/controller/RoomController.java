package com.example.hotel.controller;

import com.example.hotel.entity.Room;
import com.example.hotel.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    // Λήψη όλων των δωματίων
    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Δημιουργία νέου δωματίου
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        if (room.getType() == null || room.getPrice() == null || room.getAvailability() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        Room savedRoom = roomRepository.save(room);
        return ResponseEntity.ok(savedRoom);
    }
}
