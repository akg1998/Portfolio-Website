package com.portfolio.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KeepAliveService {

    private static final Logger logger = LoggerFactory.getLogger(KeepAliveService.class);
    private final RestTemplate restTemplate = new RestTemplate();

    // Render injects the public RENDER_EXTERNAL_URL into the environment. We fallback to localhost for development.
    @Value("${RENDER_EXTERNAL_URL:http://localhost:8080}")
    private String serverUrl;

    // Ping every 14 minutes (14 * 60 * 1000 = 840000 milliseconds)
    @Scheduled(fixedRateString = "840000")
    public void pingSelf() {
        try {
            // Send a GET request to an existing, lightweight endpoint
            String url = serverUrl + "/api/projects"; 
            logger.info("Executing Keep-Alive ping to prevent Render server sleep: {}", url);
            restTemplate.getForObject(url, String.class);
            logger.info("Keep-Alive ping successful.");
        } catch (Exception e) {
            logger.error("Keep-Alive ping failed: {}", e.getMessage());
        }
    }
}
