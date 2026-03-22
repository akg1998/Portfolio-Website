package com.portfolio.backend.controller;

import com.portfolio.backend.entity.UniqueVisitor;
import com.portfolio.backend.repository.UniqueVisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class VisitorController {

    private final UniqueVisitorRepository repository;

    @Autowired
    public VisitorController(UniqueVisitorRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/hit")
    public Long recordVisit(@RequestBody Map<String, String> body) {
        String visitorId = body.get("visitorId");
        if (visitorId != null && !visitorId.isEmpty() && !repository.existsById(visitorId)) {
            UniqueVisitor visitor = new UniqueVisitor();
            visitor.setVisitorId(visitorId);
            visitor.setFirstVisitAt(LocalDateTime.now());
            repository.save(visitor);
        }
        return repository.count();
    }

    @GetMapping
    public Long getCount() {
        return repository.count();
    }
}
