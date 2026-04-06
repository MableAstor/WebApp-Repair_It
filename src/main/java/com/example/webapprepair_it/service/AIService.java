package com.example.webapprepair_it.service;

import com.example.webapprepair_it.dto.AIResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public AIService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
    }

    public AIResponse analyze(String text) {
        String category = autoTag(text);
        String severity = calculateSeverity(text);

        if ("อื่นๆ".equals(category)) {
            category = callAI(text);
        }

        return new AIResponse(category, severity);
    }

    public String autoTag(String text) {
        if (text == null || text.isEmpty()) return "อื่นๆ";

        text = normalize(text);

        Map<String, Map<String, Integer>> dict = new HashMap<>();

        dict.put("เก้าอี้", Map.of(
                "เก้าอี้", 3, "โยก", 2, "หัก", 2
        ));

        dict.put("เครื่องปรับอากาศ", Map.of(
                "แอร์", 3, "ไม่เย็น", 3, "ร้อน", 2
        ));

        dict.put("ชักโครก", Map.of(
                "ชักโครก", 3, "ตัน", 3, "กดไม่ได้", 3
        ));

        dict.put("หลอดไฟ", Map.of(
                "ไฟดับ", 3, "มืด", 2, "ไฟ", 1
        ));

        String bestCategory = "อื่นๆ";
        int maxScore = 0;

        for (String category : dict.keySet()) {
            int score = 0;

            for (String keyword : dict.get(category).keySet()) {
                if (text.contains(keyword)) {
                    score += dict.get(category).get(keyword);
                }
            }

            if (score > maxScore) {
                maxScore = score;
                bestCategory = category;
            }
        }

        if (maxScore < 2) return "อื่นๆ";

        return bestCategory;
    }

    public String calculateSeverity(String text) {
        if (text == null) return "LOW";

        text = normalize(text);

        int score = 0;

        Map<String, Integer> severityMap = Map.ofEntries(
                Map.entry("ใช้ไม่ได้", 3),
                Map.entry("ใช้งานไม่ได้", 3),
                Map.entry("พัง", 3),
                Map.entry("เสีย", 3),
                Map.entry("ด่วน", 3),
                Map.entry("อันตราย", 4),
                Map.entry("หัก", 2),
                Map.entry("โยก", 2),
                Map.entry("รั่ว", 2),
                Map.entry("ไม่เย็น", 2),
                Map.entry("ร้อนมาก", 2),
                Map.entry("ตัน", 3)
        );

        for (String key : severityMap.keySet()) {
            if (text.contains(key)) {
                score += severityMap.get(key);
            }
        }

        if (score >= 5) return "HIGH";
        if (score >= 3) return "MEDIUM";
        return "LOW";
    }

    private String callAI(String text) {
        try {
            String prompt = """
                    จัดหมวดหมู่ข้อความแจ้งซ่อมนี้
                    ให้ตอบได้แค่ 1 คำจากตัวเลือกนี้เท่านั้น:
                    เครื่องปรับอากาศ, หลอดไฟ, ชักโครก, เก้าอี้, อื่นๆ

                    ข้อความ:
                    %s
                    """.formatted(text);

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-4o-mini");
            body.put("temperature", 0);

            List<Map<String, String>> messages = List.of(
                    Map.of("role", "system", "content", "คุณคือระบบจัดหมวดหมู่คำแจ้งซ่อม ตอบสั้นที่สุดและห้ามอธิบายเพิ่ม"),
                    Map.of("role", "user", "content", prompt)
            );

            body.put("messages", messages);

            Map response = webClient.post()
                    .uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || response.get("choices") == null) {
                return "อื่นๆ";
            }

            List choices = (List) response.get("choices");
            if (choices.isEmpty()) {
                return "อื่นๆ";
            }

            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");
            if (message == null || message.get("content") == null) {
                return "อื่นๆ";
            }

            String result = message.get("content").toString().trim();

            if (result.contains("เครื่องปรับอากาศ")) return "เครื่องปรับอากาศ";
            if (result.contains("หลอดไฟ")) return "หลอดไฟ";
            if (result.contains("ชักโครก")) return "ชักโครก";
            if (result.contains("เก้าอี้")) return "เก้าอี้";

            return "อื่นๆ";

        } catch (Exception e) {
            return "อื่นๆ";
        }
    }

    private String normalize(String text) {
        return text.toLowerCase()
                .replaceAll("\\s+", "")
                .replaceAll("ๆ", "")
                .trim();
    }
}