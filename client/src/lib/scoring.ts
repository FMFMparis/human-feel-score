// Définissez vos critères d'évaluation ici
export interface ScoreDetail {
  category: string;    // Nom de la catégorie
  score: number;       // Score obtenu
  maxScore: number;    // Score maximum possible
  details: string[];   // Détails de l'évaluation
}

// Modifiez cette fonction pour personnaliser vos critères et leur pondération
export function calculateScoreDetails(html: string): ScoreDetail[] {
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

  // Typographie & Lisibilité (20 points max)
  const typographyScore = details[0];
  if (html.includes('<h1')) {
    typographyScore.score += 4;
    typographyScore.details.push('Utilisation de titres principaux');
  }
  if (html.includes('<h2') || html.includes('<h3')) {
    typographyScore.score += 4;
    typographyScore.details.push('Hiérarchie de titres');
  }
  if (html.includes('font-family') || html.includes('font-size')) {
    typographyScore.score += 4;
    typographyScore.details.push('Personnalisation des polices');
  }
  if (html.includes('line-height')) {
    typographyScore.score += 4;
    typographyScore.details.push('Interlignage optimisé');
  }
  if (html.includes('letter-spacing')) {
    typographyScore.score += 4;
    typographyScore.details.push('Espacement des lettres personnalisé');
  }

  // Couleurs & Contraste (20 points max)
  const colorScore = details[1];
  if (html.includes('color:')) {
    colorScore.score += 5;
    colorScore.details.push('Utilisation de couleurs personnalisées');
  }
  if (html.includes('background-color:')) {
    colorScore.score += 5;
    colorScore.details.push('Couleurs de fond personnalisées');
  }
  if (html.includes('gradient')) {
    colorScore.score += 5;
    colorScore.details.push('Utilisation de dégradés');
  }
  if (html.includes('opacity') || html.includes('rgba')) {
    colorScore.score += 5;
    colorScore.details.push('Gestion de la transparence');
  }

  // Éléments Interactifs (20 points max)
  const interactiveScore = details[2];
  if (html.includes('<button') || html.includes('role="button"')) {
    interactiveScore.score += 5;
    interactiveScore.details.push('Boutons bien définis');
  }
  if (html.includes('<form')) {
    interactiveScore.score += 5;
    interactiveScore.details.push('Formulaires présents');
  }
  if (html.includes('hover') || html.includes(':focus')) {
    interactiveScore.score += 5;
    interactiveScore.details.push('États interactifs');
  }
  if (html.includes('transition') || html.includes('animation')) {
    interactiveScore.score += 5;
    interactiveScore.details.push('Animations et transitions');
  }

  // Présentation du Contenu (20 points max)
  const presentationScore = details[3];
  if (html.includes('grid') || html.includes('flex')) {
    presentationScore.score += 5;
    presentationScore.details.push('Layout moderne');
  }
  if (html.includes('padding') || html.includes('margin')) {
    presentationScore.score += 5;
    presentationScore.details.push('Espacement du contenu');
  }
  if (html.includes('<img') || html.includes('<picture')) {
    presentationScore.score += 5;
    presentationScore.details.push('Utilisation d\'images');
  }
  if (html.includes('<svg') || html.includes('<icon')) {
    presentationScore.score += 5;
    presentationScore.details.push('Utilisation d\'icônes');
  }

  // Accessibilité (20 points max)
  const accessibilityScore = details[4];
  if (html.includes('aria-')) {
    accessibilityScore.score += 5;
    accessibilityScore.details.push('Attributs ARIA');
  }
  if (html.includes('alt="')) {
    accessibilityScore.score += 5;
    accessibilityScore.details.push('Textes alternatifs');
  }
  if (html.includes('role="')) {
    accessibilityScore.score += 5;
    accessibilityScore.details.push('Rôles sémantiques');
  }
  if (html.includes('<label')) {
    accessibilityScore.score += 5;
    accessibilityScore.details.push('Labels pour les formulaires');
  }

  return details;
}

// Calcule le score total basé sur les détails
export function calculateTotalScore(details: ScoreDetail[]): number {
  const totalMaxScore = details.reduce((sum, detail) => sum + detail.maxScore, 0);
  const totalScore = details.reduce((sum, detail) => sum + detail.score, 0);
  return Math.round((totalScore / totalMaxScore) * 100);
}