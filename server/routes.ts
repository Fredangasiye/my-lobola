import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculatorFormSchema } from "@shared/schema";
import { calculateLobola } from "../client/src/lib/calculator";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/calculate", async (req, res) => {
    try {
      // Validate request body
      const validatedData = calculatorFormSchema.parse(req.body);
      
      // Calculate lobola using our algorithm
      const results = calculateLobola(validatedData);
      
      // Store calculation for analytics (optional)
      try {
        await storage.createCalculation({
          ...validatedData,
          result: results.amount,
          breakdown: JSON.stringify(results.breakdown),
        });
      } catch (storageError) {
        // Log storage error but don't fail the request
        console.error("Failed to store calculation:", storageError);
      }
      
      res.json(results);
    } catch (error) {
      console.error("Calculation error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Invalid calculation data" 
      });
    }
  });

  app.get("/api/calculations/stats", async (req, res) => {
    try {
      const stats = await storage.getCalculationStats();
      res.json(stats);
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ message: "Failed to retrieve statistics" });
    }
  });

  // Proxy to OpenRouter for Uncle Wisdom AI
  app.post("/api/uncle-wisdom/ask", async (req, res) => {
    try {
      const { prompt, model } = req.body ?? {};
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ message: "Missing prompt" });
      }
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: "Server not configured for OpenRouter" });
      }
      const selectedModel = (typeof model === "string" && model) || process.env.OPENROUTER_MODEL || "openrouter/auto";

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "https://my-lobola-working",
          "X-Title": process.env.OPENROUTER_APP_NAME || "My Lobola",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: "system", content: "You are Uncle Wisdom, a culturally-sensitive assistant for Lobola advice. Keep responses concise, respectful, and avoid legal/financial guarantees." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("OpenRouter error:", response.status, text);
        return res.status(502).json({ message: "Upstream AI error", status: response.status });
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content ?? "";
      res.json({ content });
    } catch (error) {
      console.error("Uncle Wisdom AI error:", error);
      res.status(500).json({ message: "Failed to get AI response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
