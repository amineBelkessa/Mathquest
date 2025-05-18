package com.mathquest.dto;

public class AddEnfantRequest {
    private String parentId;
    private String enfantId;

    // 🔧 Constructor par défaut (important pour Spring)
    public AddEnfantRequest() {}

    public AddEnfantRequest(String parentId, String enfantId) {
        this.parentId = parentId;
        this.enfantId = enfantId;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getEnfantId() {
        return enfantId;
    }

    public void setEnfantId(String enfantId) {
        this.enfantId = enfantId;
    }
}
