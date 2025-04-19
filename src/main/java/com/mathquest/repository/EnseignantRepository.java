package com.mathquest.repository;

import com.mathquest.model.Enseignant;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface EnseignantRepository extends MongoRepository<Enseignant, String> {
    Optional<Enseignant> findByEmail(String email);
}
