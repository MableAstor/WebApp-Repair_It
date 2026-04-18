package com.example.webapprepair_it.service;

import com.example.webapprepair_it.dto.AIResponse;
import com.example.webapprepair_it.entity.RepairCategory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static com.example.webapprepair_it.entity.RepairCategory.*;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public AIService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
    }

    public AIResponse analyze(String text, RepairCategory categoryFromUser) {
        String category = autoTag(text);
        RepairCategory mainCategory = mapToMainCategory(categoryFromUser);
        String severity = calculateSeverity(text, mainCategory);

        if ("อื่นๆ".equals(category)) {
            category = callAI(text);
        }

        return new AIResponse(category, severity);
    }

    private RepairCategory mapToMainCategory(RepairCategory category) {
        if (category == null) return RepairCategory.OTHER;
        return category;
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
                "ไฟดับ", 3,
                "ไฟเสีย", 3,
                "หลอด", 2,
                "ไฟ", 1,
                "แตก", 2,
                "ระเบิด", 3,
                "มืด", 2
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

        if (maxScore < 1) return "อื่นๆ";

        return bestCategory;
    }

    public String calculateSeverity(String text, RepairCategory category) {
        if (text == null) return "LOW";
        if (category == null) category = RepairCategory.OTHER;

        text = normalize(text);

        int score = 0;
        Map<String, Integer> severityMap = new HashMap<>();

        switch (category) {
            case ELECTRICAL -> {
                severityMap.put("ไฟดับ", 3);
                severityMap.put("ไฟไม่ติด", 3);
                severityMap.put("ติดๆดับๆ", 2);
                severityMap.put("หลอดไฟแตก", 3);
                severityMap.put("หลอดแตก", 2);
                severityMap.put("แตก", 2);
                severityMap.put("ระเบิด", 4);
                severityMap.put("แตกกระเด็น", 4);
                severityMap.put("ช็อต", 4);
                severityMap.put("ไฟช็อต", 4);
                severityMap.put("ประกายไฟ", 4);
                severityMap.put("ไฟดูด", 5);
                severityMap.put("ไฟรั่ว", 4);
                severityMap.put("ควัน", 4);
                severityMap.put("ไหม้", 4);
                severityMap.put("กลิ่นไหม้", 4);
                severityMap.put("สายไฟขาด", 3);
                severityMap.put("สายไฟหลุด", 2);
                severityMap.put("อันตราย", 5);
                severityMap.put("ใช้งานไม่ได้", 3);
                severityMap.put("เสีย", 2);
                severityMap.put("พัง", 2);
                severityMap.put("แรงมาก", 2);
                severityMap.put("อันตรายมาก", 3);
                severityMap.put("เสี่ยง", 3);
                severityMap.put("น่ากลัว", 2);
                severityMap.put("ระเบิดแรง", 4);
            }

            case AIR_CONDITIONER -> {
                severityMap.put("ไม่เย็น", 3);
                severityMap.put("แอร์เสีย", 3);
                severityMap.put("แอร์พัง", 3);
                severityMap.put("ไม่ทำงาน", 3);
                severityMap.put("เปิดไม่ติด", 3);
                severityMap.put("ใช้งานไม่ได้", 3);
                severityMap.put("น้ำหยด", 2);
                severityMap.put("น้ำรั่ว", 2);
                severityMap.put("ร้อนมาก", 2);
                severityMap.put("เสียงดัง", 1);
                severityMap.put("กลิ่นเหม็น", 1);
            }

            case WATER -> {
                severityMap.put("น้ำรั่ว", 3);
                severityMap.put("รั่ว", 2);
                severityMap.put("ท่อแตก", 4);
                severityMap.put("น้ำซึม", 2);
                severityMap.put("น้ำไหลไม่หยุด", 3);
                severityMap.put("น้ำไม่ไหล", 3);
                severityMap.put("น้ำล้น", 4);
                severityMap.put("น้ำทะลัก", 4);
                severityMap.put("ตัน", 3);
                severityMap.put("อุดตัน", 3);
                severityMap.put("กดไม่ลง", 3);
                severityMap.put("ใช้งานไม่ได้", 3);
                severityMap.put("กลิ่นเหม็น", 1);
            }

            case FURNITURE -> {
                severityMap.put("หัก", 3);
                severityMap.put("โยก", 2);
                severityMap.put("หลวม", 2);
                severityMap.put("พัง", 3);
                severityMap.put("แตก", 2);
                severityMap.put("ไม่มั่นคง", 3);
                severityMap.put("เอียง", 2);
                severityMap.put("ใช้งานไม่ได้", 3);
                severityMap.put("ขาเก้าอี้เสีย", 3);
            }

            case NETWORK -> {
                severityMap.put("เน็ตช้า", 1);
                severityMap.put("เน็ตหลุด", 2);
                severityMap.put("เชื่อมต่อไม่ได้", 3);
                severityMap.put("wifiใช้ไม่ได้", 3);
                severityMap.put("ไม่มีสัญญาณ", 3);
                severityMap.put("เครื่องค้าง", 2);
                severityMap.put("เปิดไม่ติด", 3);
                severityMap.put("เข้าไม่ได้", 2);
                severityMap.put("ใช้งานไม่ได้", 3);
            }

            case CLEANING -> {
                severityMap.put("สกปรก", 1);
                severityMap.put("มีขยะ", 1);
                severityMap.put("มีกลิ่น", 1);
                severityMap.put("เหม็น", 1);
                severityMap.put("มีคราบ", 1);
                severityMap.put("เลอะ", 1);
                severityMap.put("ไม่ได้ทำความสะอาด", 2);
                severityMap.put("น้ำขัง", 2);
            }

            case OTHER -> {
                severityMap.put("เสีย", 2);
                severityMap.put("พัง", 2);
                severityMap.put("ใช้งานไม่ได้", 3);
                severityMap.put("อันตราย", 4);
                severityMap.put("ด่วน", 3);
                severityMap.put("แตก", 2);
                severityMap.put("รั่ว", 2);
            }
        }

        if (text.contains("ระเบิด") || text.contains("ไฟดูด") || text.contains("ช็อต")) {
            score += 2;
        }

        for (String key : severityMap.keySet()) {
            String normalizedKey = normalize(key);
            if (text.contains(normalizedKey)) {
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