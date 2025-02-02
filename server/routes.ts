import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { calculateScoreDetails, calculateTotalScore } from "../client/src/lib/scoring";
import { analyzeTone } from "../client/src/lib/openai-service";
import { JSDOM } from "jsdom";

export function registerRoutes(app: Express): Server {
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ message: "URL is required" });
      }

      // Récupération du HTML de la page
      const response = await fetch(url);
      const html = await response.text();

      // Extraction du texte pour l'analyse de tonalité
      const dom = new JSDOM(html);
      const textContent = dom.window.document.body.textContent || "";

      // Analyses parallèles
      const [scoreDetails, toneAnalysis] = await Promise.all([
        Promise.resolve(calculateScoreDetails(html)),
        analyzeTone(textContent)
      ]);

      // Calcul du score total
      const totalScore = calculateTotalScore(scoreDetails);

      // Renvoie le score, les détails et l'analyse de tonalité
      res.json({ 
        score: totalScore,
        details: scoreDetails,
        toneAnalysis
      });
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ message: "Failed to analyze URL" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}