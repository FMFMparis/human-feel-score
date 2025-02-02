import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { calculateScoreDetails, calculateTotalScore } from "../client/src/lib/scoring";

export function registerRoutes(app: Express): Server {
  // Route pour analyser une URL
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ message: "URL is required" });
      }

      // Récupération du HTML de la page
      const response = await fetch(url);
      const html = await response.text();

      // Calcul des scores détaillés
      const scoreDetails = calculateScoreDetails(html);

      // Calcul du score total
      const totalScore = calculateTotalScore(scoreDetails);

      // Renvoie le score et les détails
      res.json({ 
        score: totalScore,
        details: scoreDetails
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze URL" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}