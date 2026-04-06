package com.example.webapprepair_it.dto;

public class AIResponse {

    private String category;
    private String severity;

    public AIResponse(String category, String severity) {
        this.category = category;
        this.severity = severity;
    }

    public String getCategory() {
        return category;
    }

    public String getSeverity() {
        return severity;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }
}
