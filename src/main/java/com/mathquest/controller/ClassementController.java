package com.mathquest.controller;

import com.mathquest.model.Classement;
import com.mathquest.service.ClassementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classement")
public class ClassementController {

    private final ClassementService classementService;

    public ClassementController(ClassementService classementService) {
        this.classementService = classementService;
    }

    @GetMapping
    public ResponseEntity<List<Classement>> getClassement() {
        return ResponseEntity.ok(classementService.getClassement());
    }
}
