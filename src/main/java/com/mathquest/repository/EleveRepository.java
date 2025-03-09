package com.mathquest.repository;

import com.mathquest.model.Eleve;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EleveRepository extends MongoRepository<Eleve, String> {
    Optional<Eleve> findByEmail(String email);
}
