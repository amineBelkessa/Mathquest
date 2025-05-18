package com.mathquest.controller;

import com.mathquest.dto.AddEnfantRequest;
import com.mathquest.dto.EnfantDTO;
import com.mathquest.service.ParentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parent")
public class ParentController {

    private final ParentService parentService;

    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    // ✅ Ajouter un enfant à la liste des enfants du parent
    @PostMapping("/add-enfant")
    public ResponseEntity<String> addEnfant(@RequestBody AddEnfantRequest request) {
        try {
            System.out.println("🔽 Requête reçue pour ajouter un enfant :");
            System.out.println("🧑‍🎓 Enfant ID : " + request.getEnfantId());
            System.out.println("👨‍👧 Parent ID : " + request.getParentId());

            if (request.getParentId() == null || request.getEnfantId() == null) {
                return ResponseEntity.badRequest().body("ParentId ou EnfantId manquant.");
            }

            parentService.addEnfantToParent(request.getParentId(), request.getEnfantId());

            System.out.println("✅ Enfant ajouté avec succès.");
            return ResponseEntity.ok("Enfant ajouté avec succès.");
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'ajout de l'enfant : " + e.getMessage());
            e.printStackTrace(); // log complet pour debug
            return ResponseEntity.status(400).body("Erreur lors de l'ajout de l'enfant : " + e.getMessage());
        }
    }

    // ✅ Supprimer un enfant de la liste des enfants du parent
    @DeleteMapping("/remove-enfant")
    public ResponseEntity<String> removeEnfant(@RequestParam String parentId, @RequestParam String enfantId) {
        try {
            System.out.println("🗑️ Suppression de l'enfant : " + enfantId + " du parent : " + parentId);
            parentService.removeEnfantFromParent(parentId, enfantId);
            return ResponseEntity.ok("Enfant supprimé avec succès.");
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la suppression de l'enfant : " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(400).body("Erreur lors de la suppression de l'enfant : " + e.getMessage());
        }
    }

    // ✅ Récupérer la liste des enfants d'un parent
    @GetMapping("/{parentId}/enfants")
    public ResponseEntity<List<EnfantDTO>> getEnfants(@PathVariable String parentId) {
        System.out.println("📥 Récupération des enfants pour le parent ID : " + parentId);

        try {
            List<EnfantDTO> enfants = parentService.getEnfantsOfParent(parentId);
            System.out.println("📤 Enfants trouvés : " + enfants.size());
            return ResponseEntity.ok(enfants);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération des enfants : " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(400).body(null);
        }
    }
}
