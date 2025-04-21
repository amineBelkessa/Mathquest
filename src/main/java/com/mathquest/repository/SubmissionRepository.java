package com.mathquest.repository;

import com.mathquest.model.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends MongoRepository<Submission, String> {
    List<Submission> findByUsername(String username);

    // ✅ Étape 3 : Récupérer toutes les soumissions associées à un salon
    List<Submission> findByCodeSalon(String codeSalon);
}
