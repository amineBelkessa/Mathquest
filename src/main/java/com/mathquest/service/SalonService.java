package com.mathquest.service;

import com.mathquest.model.Exercice;
import com.mathquest.model.Salon;
import com.mathquest.repository.ExerciceRepository;
import com.mathquest.repository.SalonRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SalonService {

    private final SalonRepository salonRepository;
    private final ExerciceRepository exerciceRepository;

    public SalonService(SalonRepository salonRepository, ExerciceRepository exerciceRepository) {
        this.salonRepository = salonRepository;
        this.exerciceRepository = exerciceRepository;
    }

    // 🔹 Créer un salon avec un code généré automatiquement
    public Salon creerSalon(Salon salon) {
        String code = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        salon.setCode(code);

        // Initialiser les listes si null
        if (salon.getElevesEmails() == null) {
            salon.setElevesEmails(new ArrayList<>());
        }
        if (salon.getExercicesIds() == null) {
            salon.setExercicesIds(new ArrayList<>());
        }

        return salonRepository.save(salon);
    }

    // 🔹 Récupérer un salon par code
    public Optional<Salon> getSalonByCode(String code) {
        return salonRepository.findByCode(code);
    }

    // 🔹 Ajouter un élève à un salon
    public Salon ajouterEleveAuSalon(String code, String emailEleve) {
        Optional<Salon> salonOpt = salonRepository.findByCode(code);
        if (salonOpt.isEmpty()) {
            throw new RuntimeException("Salon non trouvé pour le code : " + code);
        }

        Salon salon = salonOpt.get();
        List<String> eleves = salon.getElevesEmails();
        if (!eleves.contains(emailEleve)) {
            eleves.add(emailEleve);
            salon.setElevesEmails(eleves);
            salonRepository.save(salon);
        }

        return salon;
    }

    // 🔹 Ajouter un exercice à un salon
    public Salon ajouterExerciceAuSalon(String code, String exerciceId) {
        Optional<Salon> salonOpt = salonRepository.findByCode(code);
        if (salonOpt.isEmpty()) {
            throw new RuntimeException("Salon non trouvé pour le code : " + code);
        }

        Salon salon = salonOpt.get();
        List<String> exercices = salon.getExercicesIds();
        if (!exercices.contains(exerciceId)) {
            exercices.add(exerciceId);
            salon.setExercicesIds(exercices);
            salonRepository.save(salon);
        }

        return salon;
    }

    // ✅ Obtenir les exercices associés à un salon
    public List<Exercice> getExercicesPourSalon(String codeSalon) {
        Optional<Salon> salonOpt = salonRepository.findByCode(codeSalon);
        if (salonOpt.isEmpty()) {
            throw new RuntimeException("Salon non trouvé");
        }

        Salon salon = salonOpt.get();
        List<String> ids = salon.getExercicesIds();

        // Filtrer uniquement ceux qui existent réellement
        return exerciceRepository.findAllById(ids);
    }

    // 🔹 Lister tous les salons
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    // 🔹 Obtenir tous les salons créés par un professeur
    public List<Salon> getSalonsByProfesseur(String email) {
        return salonRepository.findByProfesseurEmail(email);
    }

    // ✅ ➕ Obtenir les salons où un élève est inscrit
    public List<Salon> getSalonsRejointsParEleve(String emailEleve) {
        return salonRepository.findAll().stream()
                .filter(salon -> salon.getElevesEmails() != null && salon.getElevesEmails().contains(emailEleve))
                .toList();
    }
}
