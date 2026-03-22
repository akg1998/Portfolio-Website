package com.portfolio.backend.service;

import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@Service
public class ContactService {

    private final ContactMessageRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${resend.api.key:NOT_SET}")
    private String resendApiKey;

    @Value("${contact.recipient.email:akshayghavale1998@gmail.com}")
    private String recipientEmail;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ContactMessage saveMessage(ContactMessage message) {
        // Save to DB
        ContactMessage saved = repository.save(message);

        // Send email via Resend HTTP API (port 443, never blocked by cloud firewalls)
        CompletableFuture.runAsync(() -> {
            try {
                if ("NOT_SET".equals(resendApiKey)) {
                    System.err.println("Resend API key not configured. Skipping email.");
                    return;
                }

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setBearerAuth(resendApiKey);

                String emailBody = String.format(
                    "You received a new message from your portfolio website!\n\n" +
                    "Name: %s\nEmail: %s\n\nMessage:\n%s",
                    message.getName(),
                    message.getEmail(),
                    message.getMessage()
                );

                String jsonPayload = String.format(
                    "{\"from\":\"Portfolio Contact <onboarding@resend.dev>\"," +
                    "\"to\":[\"%s\"]," +
                    "\"subject\":\"New Portfolio Contact: %s\"," +
                    "\"text\":\"%s\"}",
                    recipientEmail,
                    message.getName().replace("\"", "\\\""),
                    emailBody.replace("\"", "\\\"").replace("\n", "\\n")
                );

                HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);
                ResponseEntity<String> response = restTemplate.postForEntity(
                    "https://api.resend.com/emails", request, String.class
                );

                System.out.println("Email sent via Resend! Status: " + response.getStatusCode());
            } catch (Exception e) {
                System.err.println("Failed to send email via Resend. Error: " + e.getMessage());
            }
        });

        return saved;
    }
}
