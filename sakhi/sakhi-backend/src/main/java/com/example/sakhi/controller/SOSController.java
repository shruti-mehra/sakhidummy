package com.example.sakhi.controller;

import com.example.sakhi.dto.SOSRequest;
import com.example.sakhi.model.SOSAlert;
import com.example.sakhi.service.SOSService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sos")
public class SOSController {

    private final SOSService sosService;

    public SOSController(
            SOSService sosService
    ) {
        this.sosService = sosService;
    }

    @PostMapping
    public ResponseEntity<?> createSOS(
            @RequestBody SOSRequest request
    ) {

        try {

            SOSAlert alert =
                    sosService.createSOS(request);

            return ResponseEntity.ok(alert);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<SOSAlert>> getAlerts(
            @RequestParam Long userId
    ) {

        return ResponseEntity.ok(
                sosService.getAlerts(userId)
        );
    }
}