package com.mathquest.repository;

import com.mathquest.model.Exercice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciceRepository extends MongoRepository<Exercice, String> {

    // 🔍 Recherche stricte (ancienne)
    List<Exercice> findByTypeExercice(String typeExercice);

    // 🔍 Nouvelle méthode : recherche insensible à la casse avec regex
    @Query("{ 'typeExercice': { $regex: ?0, $options: 'i' } }")
    List<Exercice> findByTypeExerciceRegex(String regex);
}
