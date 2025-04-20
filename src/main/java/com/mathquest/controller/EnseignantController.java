package com.mathquest.controller;

import com.mathquest.dto.EleveDTO;
import com.mathquest.model.Eleve;
import com.mathquest.repository.EleveRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enseignant")
public class EnseignantController {

    private final EleveRepository eleveRepository;

    public EnseignantController(EleveRepository eleveRepository) {
        this.eleveRepository = eleveRepository;
    }

    @GetMapping("/eleves")
    public List<EleveDTO> getElevesForEnseignant() {
        List<Eleve> eleves = eleveRepository.findAll();
        return eleves.stream()
                .map(e -> new EleveDTO(e.getId(), e.getUsername(), e.getEmail()))
                .toList();
    }
}
