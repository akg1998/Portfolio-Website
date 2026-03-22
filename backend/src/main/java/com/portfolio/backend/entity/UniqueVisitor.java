package com.portfolio.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "unique_visitors")
public class UniqueVisitor {

    @Id
    private String visitorId;

    private LocalDateTime firstVisitAt = LocalDateTime.now();

    public String getVisitorId() { return visitorId; }
    public void setVisitorId(String visitorId) { this.visitorId = visitorId; }
    public LocalDateTime getFirstVisitAt() { return firstVisitAt; }
    public void setFirstVisitAt(LocalDateTime firstVisitAt) { this.firstVisitAt = firstVisitAt; }
}
