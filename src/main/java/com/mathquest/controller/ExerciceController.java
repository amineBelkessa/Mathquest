package com.mathquest.controller;

import com.mathquest.model.Exercice;
import com.mathquest.repository.ExerciceRepository;
import com.mathquest.service.ExerciceService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercices")
public class ExerciceController {

    private final ExerciceService service;
    private final ExerciceRepository repository;

    public ExerciceController(ExerciceService service, ExerciceRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    // 🔹 Récupérer tous les exercices
    @GetMapping
    public List<Exercice> getAll() {
        return service.getAllExercices();
    }

    // 🔹 Récupérer un exercice par ID
    @GetMapping("/{id}")
    public Exercice getExerciceById(@PathVariable String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exercice non trouvé"));
    }

    // 🔹 Récupérer les exercices par type
    @GetMapping("/type/{typeExercice}")
    public List<Exercice> getByTypeExercice(@PathVariable String typeExercice) {
        return service.getByTypeExercice(typeExercice);
    }

    // 🔹 Récupérer la liste des types distincts d'exercices
    @GetMapping("/types")
    public List<String> getAllTypes() {
        return service.getDistinctTypes();
    }

    // 🔹 Créer un exercice avec un fichier PDF (optionnel)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Exercice createExerciceWithPdf(
            @RequestPart("exerciceData") Exercice ex,
            @RequestPart(value = "pdfFile", required = false) MultipartFile pdfFile
    ) throws IOException {
        return service.createExerciceWithPdf(ex, pdfFile);
    }

    // 🔹 Télécharger le PDF associé à un exercice
    @GetMapping("/pdf/{id}")
    public ResponseEntity<Resource> downloadPdf(@PathVariable String id) {
        Exercice ex = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exercice non trouvé"));

        if (ex.getPdfPath() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun PDF associé à cet exercice");
        }

        try {
            File file = new File(ex.getPdfPath());
            if (!file.exists()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fichier PDF non trouvé");
            }
            Resource resource = new UrlResource(file.toURI());
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la lecture du PDF", e);
        }
    }

    // 🔹 Soumettre les réponses d'un exercice
    @PostMapping("/{id}/soumettre")
    public ResponseEntity<?> soumettreReponses(
            @PathVariable String id,
            @RequestBody List<Exercice.Question> reponsesSoumises
    ) {
        Optional<Exercice> optExercice = repository.findById(id);
        if (optExercice.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Exercice non trouvé");
        }

        Exercice exercice = optExercice.get();
        int score = 0;
        int totalQuestions = exercice.getQuestions().size();

        for (int i = 0; i < totalQuestions; i++) {
            Exercice.Question question = exercice.getQuestions().get(i);
            if (i < reponsesSoumises.size()) {
                String reponseSoumise = reponsesSoumises.get(i).getReponseCorrecte().trim();
                if (question.getReponseCorrecte().trim().equalsIgnoreCase(reponseSoumise)) {
                    score++;
                }
            }
        }

        int scorePourcentage = (int) (((double) score / totalQuestions) * 100);
        return ResponseEntity.ok().body("Score : " + score + " / " + totalQuestions + " (" + scorePourcentage + "%)");
    }
}
