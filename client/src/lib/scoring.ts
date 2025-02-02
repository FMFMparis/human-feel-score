// Configuration des critères d'évaluation
const CRITERES_EVALUATION = [
  {
    category: "Hospitalité Communautaire",
    criteres: [
      {
        nom: "Forums",
        points: 10,
        condition: "forum",
        description: "Présence d'un espace forum"
      },
      {
        nom: "Commentaires",
        points: 10,
        condition: "comment",
        description: "Système de commentaires"
      },
      {
        nom: "Blog",
        points: 8,
        condition: "blog",
        description: "Section blog"
      },
      {
        nom: "Podcasts",
        points: 7,
        condition: "podcast",
        description: "Contenus audio/podcasts"
      },
      {
        nom: "Réseaux sociaux",
        points: 10,
        condition: ["social", "twitter", "facebook", "linkedin", "instagram"],
        description: "Intégration réseaux sociaux"
      }
    ]
  },
  {
    category: "Hospitalité Relationnelle",
    criteres: [
      {
        nom: "UX Writing",
        points: 10,
        condition: ["bienvenue", "joie", "facile", "expérience"],
        description: "Langage accueillant et positif"
      },
      {
        nom: "Service client",
        points: 12,
        condition: ["contact", "support", "aide", "chat"],
        description: "Support client accessible"
      },
      {
        nom: "FAQ et Vidéos",
        points: 10,
        condition: ["faq", "video", "tutoriel"],
        description: "Ressources d'aide"
      },
      {
        nom: "Micro-interactions",
        points: 8,
        condition: ["animation", "transition", "hover"],
        description: "Animations et interactions"
      }
    ]
  },
  {
    category: "Hospitalité Ergonomique",
    criteres: [
      {
        nom: "Design accueillant",
        points: 10,
        condition: ["background-color", "font-family", "color"],
        description: "Design visuel soigné"
      },
      {
        nom: "Navigation intuitive",
        points: 12,
        condition: ["nav", "menu", "navigation"],
        description: "Navigation claire"
      },
      {
        nom: "Optimisation vitesse",
        points: 10,
        condition: ["lazy", "async", "defer"],
        description: "Performance optimisée"
      }
    ]
  }
];

export interface ScoreDetail {
  category: string;    // Nom de la catégorie
  score: number;       // Score obtenu
  maxScore: number;    // Score maximum possible
  details: string[];   // Détails de l'évaluation
}

// Fonction qui évalue si un critère est présent dans le HTML
function evaluerCritere(html: string, condition: string | string[]): boolean {
  const htmlLower = html.toLowerCase();
  if (Array.isArray(condition)) {
    return condition.some(c => htmlLower.includes(c.toLowerCase()));
  }
  return htmlLower.includes(condition.toLowerCase());
}

// Fonction principale d'évaluation
export function calculateScoreDetails(html: string): ScoreDetail[] {
  return CRITERES_EVALUATION.map(categorie => {
    const details: string[] = [];
    let score = 0;
    const maxScore = categorie.criteres.reduce((sum, critere) => sum + critere.points, 0);

    categorie.criteres.forEach(critere => {
      if (evaluerCritere(html, critere.condition)) {
        score += critere.points;
        details.push(critere.description);
      }
    });

    return {
      category: categorie.category,
      score,
      maxScore,
      details
    };
  });
}

// Calcule le score total basé sur les détails
export function calculateTotalScore(details: ScoreDetail[]): number {
  const totalMaxScore = details.reduce((sum, detail) => sum + detail.maxScore, 0);
  const totalScore = details.reduce((sum, detail) => sum + detail.score, 0);
  return Math.round((totalScore / totalMaxScore) * 100);
}