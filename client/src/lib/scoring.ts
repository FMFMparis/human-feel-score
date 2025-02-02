// Définissez vos critères d'évaluation ici
export interface ScoreDetail {
  category: string;    // Nom de la catégorie
  score: number;       // Score obtenu
  maxScore: number;    // Score maximum possible
  details: string[];   // Détails de l'évaluation
}

// Modifiez cette fonction pour personnaliser vos critères et leur pondération
export function calculateScoreDetails(html: string): ScoreDetail[] {
  // Définissez vos catégories et leurs scores maximum ici
  const details: ScoreDetail[] = [
    {
      category: "Typographie & Lisibilité",
      score: 0,
      maxScore: 20,
      details: []
    },
    {
      category: "Couleurs & Contraste",
      score: 0,
      maxScore: 20,
      details: []
    },
    {
      category: "Éléments Interactifs",
      score: 0,
      maxScore: 20,
      details: []
    },
    {
      category: "Présentation du Contenu",
      score: 0,
      maxScore: 20,
      details: []
    },
    {
      category: "Fonctionnalités d'Accessibilité",
      score: 0,
      maxScore: 20,
      details: []
    }
  ];

  // Pour chaque catégorie, implémentez votre logique d'évaluation
  // Par exemple, pour la typographie :
  const typographyScore = details[0];
  if (html.includes('<h1')) {
    typographyScore.score += 5;
    typographyScore.details.push('Utilisation de titres principaux');
  }

  // Ajoutez vos propres règles d'évaluation ici
  // Exemple pour les couleurs :
  const colorScore = details[1];
  if (html.includes('color:') || html.includes('background-color:')) {
    colorScore.score += 5;
    colorScore.details.push('Utilisation de couleurs personnalisées');
  }

  return details;
}

// Calcule le score total basé sur les détails
export function calculateTotalScore(details: ScoreDetail[]): number {
  const totalMaxScore = details.reduce((sum, detail) => sum + detail.maxScore, 0);
  const totalScore = details.reduce((sum, detail) => sum + detail.score, 0);
  return Math.round((totalScore / totalMaxScore) * 100);
}