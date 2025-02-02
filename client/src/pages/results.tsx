import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function Results() {
  const [location, setLocation] = useLocation();
  const params = new URLSearchParams(location.split("?")[1]);
  const url = params.get("url");
  const totalScore = Number(params.get("score"));

  const { data: scoreDetails } = useQuery({
    queryKey: ["/api/analyze/details", url],
    enabled: !!url
  });

  const criteria = [
    { name: "Hospitalité Communautaire", score: 45, description: "Évaluation des espaces d'échange et de partage" },
    { name: "Hospitalité Relationnelle", score: 40, description: "Analyse de l'accueil et de l'interaction utilisateur" },
    { name: "Hospitalité Ergonomique", score: 32, description: "Évaluation du design et de la navigation" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-16 -ml-4 text-base font-light"
        >
          ← Retour à l'analyse
        </Button>

        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-light">Score d'Humanisation</h1>
              <p className="text-lg text-muted-foreground font-light break-all">
                {url}
              </p>
            </div>

            <div className="pt-8">
              <div className="text-7xl font-light mb-8">{totalScore}</div>
              <Progress value={totalScore} className="h-2 w-full max-w-lg mx-auto" />
            </div>
          </div>

          <div className="space-y-12">
            {criteria.map((criterion, index) => (
              <div key={index} className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium">{criterion.name}</h2>
                  <p className="text-muted-foreground font-light">
                    {criterion.description}
                  </p>
                </div>
                <Progress value={(criterion.score / 117) * 100} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}