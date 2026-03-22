package com.portfolio.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getProjects() {
        // Hardcoded projects as fallback/example representation
        List<Map<String, Object>> projects = List.of(
            Map.of(
                "title", "Redefined Login Security",
                "description", "Enhanced login security against shoulder surfing using dynamic alphanumeric PINs across randomized token boxes.",
                "tech", List.of("Java", "Security Architecture", "Algorithms"),
                "githubUrl", "https://github.com/akshayghavale/redefined-login"
            ),
            Map.of(
                "title", "Intelligent Surveillance System",
                "description", "Architected a real-time violence detection system utilizing CNN and LSTM neural networks via Python and Flask.",
                "tech", List.of("Python", "Flask", "Deep Learning"),
                "githubUrl", "https://github.com/akshayghavale/surveillance-system"
            ),
            Map.of(
                "title", "Trip Planner Logistics",
                "description", "Developed an interactive routing application that generates targeted travel itineraries using mapping APIs.",
                "tech", List.of("Android", "Java", "Maps API"),
                "githubUrl", "https://github.com/akshayghavale/trip-planner"
            ),
            Map.of(
                "title", "Blood Bank Sync",
                "description", "Built a centralized inventory platform linking donors with hospitals to accelerate emergency medical responses.",
                "tech", List.of("Android", "Java", "SQLite"),
                "githubUrl", "https://github.com/akshayghavale/blood-bank"
            ),
            Map.of(
                "title", "NoticeBoy Digital Portal",
                "description", "Created a digital submission portal enabling seamless academic grading and real-time inline instructor feedback.",
                "tech", List.of("Android", "Java", "Firebase"),
                "githubUrl", "https://github.com/akshayghavale/noticeboy"
            ),
            Map.of(
                "title", "Entity Management System",
                "description", "Programmed a high-integrity student reporting backend utilizing custom Linked Lists and rigorous Data Structures.",
                "tech", List.of("C++", "Data Structures", "Algorithms"),
                "githubUrl", "https://github.com/akshayghavale/student-management"
            )
        );
        return ResponseEntity.ok(projects);
    }
}
