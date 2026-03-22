package com.portfolio.backend.controller;

import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitContactForm(@Valid @RequestBody ContactMessage message) {
        ContactMessage saved = contactService.saveMessage(message);
        return ResponseEntity.ok(saved);
    }
}
