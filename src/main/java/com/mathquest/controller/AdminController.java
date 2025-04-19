package com.mathquest.controller;

import com.mathquest.model.Eleve;
import com.mathquest.repository.EleveRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final EleveRepository eleveRepository;

    public AdminController(EleveRepository eleveRepository) {
        this.eleveRepository = eleveRepository;
    }

    @GetMapping("/utilisateurs")
    public List<Eleve> getAllEleves() {
        return eleveRepository.findAll();
    }

    @DeleteMapping("/eleves/{id}")
    public ResponseEntity<Void> deleteEleve(@PathVariable String id) {
        if (!eleveRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eleveRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
