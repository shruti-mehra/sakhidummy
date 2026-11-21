package com.example.sakhi.controller;

import com.example.sakhi.dto.ContactRequest;
import com.example.sakhi.model.TrustedContact;
import com.example.sakhi.service.ContactService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(
            ContactService contactService
    ) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<?> addContact(
            @RequestParam Long userId,
            @Valid @RequestBody ContactRequest request
    ) {

        try {

            TrustedContact contact =
                    contactService.addContact(
                            userId,
                            request
                    );

            return ResponseEntity.ok(contact);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<TrustedContact>> getContacts(
            @RequestParam Long userId
    ) {

        return ResponseEntity.ok(
                contactService.getContacts(userId)
        );
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<?> deleteContact(
            @PathVariable Long contactId,
            @RequestParam Long userId
    ) {

        boolean deleted =
                contactService.deleteContact(
                        contactId,
                        userId
                );

        if (!deleted) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                "Contact deleted successfully"
        );
    }
}