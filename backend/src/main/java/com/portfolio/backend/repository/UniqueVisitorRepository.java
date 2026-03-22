package com.portfolio.backend.repository;

import com.portfolio.backend.entity.UniqueVisitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniqueVisitorRepository extends JpaRepository<UniqueVisitor, String> {
}
