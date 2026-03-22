package com.portfolio.backend.service;

import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.CompletableFuture;

@Service
public class ContactService {

    private final ContactMessageRepository repository;
    private final JavaMailSender mailSender;

    @Autowired
    public ContactService(ContactMessageRepository repository, JavaMailSender mailSender) {
        this.repository = repository;
        this.mailSender = mailSender;
    }

    @Transactional
    public ContactMessage saveMessage(ContactMessage message) {
        // Save to DB
        ContactMessage saved = repository.save(message);
        
        // Send email notification asynchronously so it never blocks the HTTP thread
        CompletableFuture.runAsync(() -> {
            try {
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setFrom("akshayghavale1998@gmail.com"); // Should match spring.mail.username
                mailMessage.setTo("akshayghavale1998@gmail.com");
                mailMessage.setSubject("New Portfolio Contact: " + message.getName());
                mailMessage.setText(String.format(
                    "You received a new message from your portfolio website!\n\n" +
                    "Name: %s\nEmail: %s\n\nMessage:\n%s",
                    message.getName(),
                    message.getEmail(),
                    message.getMessage()
                ));
                
                mailSender.send(mailMessage);
                System.out.println("Email notification sent successfully.");
            } catch (Exception e) {
                System.err.println("Failed to send email. Check SMTP configuration. Error: " + e.getMessage());
            }
        });
        
        return saved;
    }
}
