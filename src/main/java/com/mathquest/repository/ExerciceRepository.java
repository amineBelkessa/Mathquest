package com.mathquest.repository;

import com.mathquest.model.Exercice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExerciceRepository extends MongoRepository<Exercice, String> {
    // Méthode pour récupérer tous les exercices ayant un typeExercice donné
    List<Exercice> findByTypeExercice(String typeExercice);
}
