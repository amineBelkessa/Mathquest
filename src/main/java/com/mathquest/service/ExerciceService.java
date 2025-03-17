package com.mathquest.service;

import com.mathquest.model.Exercice;
import com.mathquest.repository.ExerciceRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciceService {

    private final ExerciceRepository repository;

    public ExerciceService(ExerciceRepository repository) {
        this.repository = repository;
    }

    // 1) Récupérer tous les exercices
    public List<Exercice> getAllExercices() {
        return repository.findAll();
    }

    // 2) Récupérer les exercices par type
    public List<Exercice> getByTypeExercice(String typeExercice) {
        return repository.findByTypeExercice(typeExercice);
    }

    // 3) Récupérer la liste distincte des types (arithmétique, géométrie, etc.)
    public List<String> getDistinctTypes() {
        // On récupère tous les exercices
        List<Exercice> allExercices = repository.findAll();
        // On extrait le typeExercice sans doublons
        return allExercices.stream()
                .map(Exercice::getTypeExercice)
                .filter(t -> t != null)
                .distinct()
                .collect(Collectors.toList());
    }


    // Créer un nouvel exercice (POST)


    public Exercice createExerciceWithPdf(Exercice ex, MultipartFile pdfFile) throws IOException {
        if (pdfFile != null && !pdfFile.isEmpty()) {
            // Utiliser le répertoire courant de l'application et y créer un dossier "uploads"
            String basePath = System.getProperty("user.dir") + "/uploads/";
            // Générer un nom unique pour le fichier (timestamp + nom original)
            String fileName = System.currentTimeMillis() + "_" + pdfFile.getOriginalFilename();
            File dest = new File(basePath + fileName);

            // Créer le dossier uploads s'il n'existe pas
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            // Transférer le contenu du fichier
            pdfFile.transferTo(dest);

            // Stocker le chemin absolu dans l'objet Exercice
            ex.setPdfPath(dest.getAbsolutePath());
        }
        return repository.save(ex);
    }


}
