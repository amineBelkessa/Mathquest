package com.mathquest.repository;

import com.mathquest.model.Salon;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SalonRepository extends MongoRepository<Salon, String> {
    Optional<Salon> findByCode(String code);

    // ✅ Obtenir tous les salons d’un professeur
    List<Salon> findByProfesseurEmail(String email);
    List<Salon> findByElevesEmailsContaining(String emailEleve);

}
