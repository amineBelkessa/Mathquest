package com.mathquest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "salons")
public class Salon {

    @Id
    private String id;

    private String code; // Code unique du salon (ex: ABC123)
    private String nom;  // Nom du salon

    private String professeurEmail; // Email du prof qui a créé le salon

    private List<String> elevesEmails;     // Emails des élèves qui ont rejoint le salon
    private List<String> exercicesIds;     // Exercices associés à ce salon

    private String dateDebut;  // ex: "2025-04-07T10:00"
    private String dateFin;    // ex: "2025-04-10T23:59"

    public Salon() {}

    public Salon(String code, String nom, String professeurEmail, List<String> elevesEmails,
                 List<String> exercicesIds, String dateDebut, String dateFin) {
        this.code = code;
        this.nom = nom;
        this.professeurEmail = professeurEmail;
        this.elevesEmails = elevesEmails;
        this.exercicesIds = exercicesIds;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    // === GETTERS & SETTERS ===

    public String getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getProfesseurEmail() {
        return professeurEmail;
    }

    public void setProfesseurEmail(String professeurEmail) {
        this.professeurEmail = professeurEmail;
    }

    public List<String> getElevesEmails() {
        return elevesEmails;
    }

    public void setElevesEmails(List<String> elevesEmails) {
        this.elevesEmails = elevesEmails;
    }

    public List<String> getExercicesIds() {
        return exercicesIds;
    }

    public void setExercicesIds(List<String> exercicesIds) {
        this.exercicesIds = exercicesIds;
    }

    public String getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(String dateDebut) {
        this.dateDebut = dateDebut;
    }

    public String getDateFin() {
        return dateFin;
    }

    public void setDateFin(String dateFin) {
        this.dateFin = dateFin;
    }
}
