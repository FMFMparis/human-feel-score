// Configuration des critères d'évaluation
// Vous pouvez modifier cette liste pour personnaliser vos critères
const CRITERES_EVALUATION = [
  {
    category: "Typographie & Lisibilité",
    criteres: [
      {
        nom: "Titres principaux",
        points: 4,
        condition: '<h1',  // Le critère HTML ou CSS à rechercher
        description: 'Utilisation de titres principaux'
      },
      {
        nom: "Hiérarchie de titres",
        points: 4,
        condition: ['<h2', '<h3'],  // Vous pouvez utiliser un tableau pour plusieurs conditions
        description: 'Hiérarchie de titres'
      },
      // Ajoutez ou modifiez vos critères ici
    ]
  },
  {
    category: "Couleurs & Contraste",
    criteres: [
      {
        nom: "Couleurs personnalisées",
        points: 5,
        condition: 'color:',
        description: 'Utilisation de couleurs personnalisées'
      },
      {
        nom: "Couleurs de fond",
        points: 5,
        condition: 'background-color:',
        description: 'Couleurs de fond personnalisées'
      },
      // Ajoutez ou modifiez vos critères ici
    ]
  },
  // Ajoutez ou modifiez vos catégories ici
];

export interface ScoreDetail {
  category: string;    // Nom de la catégorie
  score: number;       // Score obtenu
  maxScore: number;    // Score maximum possible
  details: string[];   // Détails de l'évaluation
}

// Fonction qui évalue si un critère est présent dans le HTML
function evaluerCritere(html: string, condition: string | string[]): boolean {
  if (Array.isArray(condition)) {
    return condition.some(c => html.includes(c));
  }
  return html.includes(condition);
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