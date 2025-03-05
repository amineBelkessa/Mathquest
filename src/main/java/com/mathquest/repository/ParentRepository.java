package com.mathquest.repository;

import com.mathquest.model.Parent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ParentRepository extends MongoRepository<Parent, String> {
    Optional<Parent> findByEmail(String email);
}
