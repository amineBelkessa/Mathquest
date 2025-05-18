package com.mathquest.service;

import com.mathquest.dto.EnfantDTO;
import com.mathquest.model.Parent;
import com.mathquest.model.Eleve;
import com.mathquest.repository.ParentRepository;
import com.mathquest.repository.EleveRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParentService {

    private final ParentRepository parentRepository;
    private final EleveRepository eleveRepository;

    public ParentService(ParentRepository parentRepository, EleveRepository eleveRepository) {
        this.parentRepository = parentRepository;
        this.eleveRepository = eleveRepository;
    }

    public void addEnfantToParent(String parentId, String enfantId) throws Exception {
        Parent parent = parentRepository.findById(parentId).orElseThrow(() -> new Exception("Parent non trouvé"));
        Eleve enfant = eleveRepository.findById(enfantId).orElseThrow(() -> new Exception("Enfant non trouvé"));

        // Ajouter l'enfant à la liste du parent
        if (parent.getListeEnfants() != null) {
            if (!parent.getListeEnfants().contains(enfant.getId())) {
                parent.getListeEnfants().add(enfant.getId());
            }
        } else {
            parent.setListeEnfants(List.of(enfant.getId()));  // Si la liste est vide, on l'initialise
        }

        parentRepository.save(parent);
    }


    // Supprimer un enfant de la liste des enfants d'un parent
    public void removeEnfantFromParent(String parentId, String enfantId) throws Exception {
        Parent parent = parentRepository.findById(parentId).orElseThrow(() -> new Exception("Parent non trouvé"));

        if (parent.getListeEnfants() != null && parent.getListeEnfants().contains(enfantId)) {
            parent.getListeEnfants().remove(enfantId);
            parentRepository.save(parent);
        } else {
            throw new Exception("Enfant non trouvé dans la liste du parent");
        }
    }

    // Récupérer la liste des enfants d'un parent
    public List<EnfantDTO> getEnfantsOfParent(String parentId) throws Exception {
        Parent parent = parentRepository.findById(parentId).orElseThrow(() -> new Exception("Parent non trouvé"));

        // Si ListeEnfants est null, on la remplace par une liste vide pour éviter les erreurs
        List<String> listeEnfants = parent.getListeEnfants() != null ? parent.getListeEnfants() : List.of();

        // Récupérer les informations sur les enfants
        return listeEnfants.stream()
                .map(enfantId -> {
                    Eleve eleve = eleveRepository.findById(enfantId).orElseThrow(() -> new RuntimeException("Enfant non trouvé"));
                    return new EnfantDTO(eleve.getId(), eleve.getUsername());
                })
                .collect(Collectors.toList());
    }
}
