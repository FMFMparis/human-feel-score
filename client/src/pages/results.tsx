import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { calculateScoreDetails } from "@/lib/scoring";

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
    { name: "Typography & Readability", score: 20, description: "Evaluation of text hierarchy, spacing, and readability" },
    { name: "Color & Contrast", score: 20, description: "Assessment of color schemes and visual contrast" },
    { name: "Interactive Elements", score: 20, description: "Analysis of buttons, forms, and interactive components" },
    { name: "Content Presentation", score: 20, description: "Review of content layout and visual hierarchy" },
    { name: "Accessibility Features", score: 20, description: "Evaluation of accessibility implementation" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button
          variant="outline"
          onClick={() => setLocation("/")}
          className="mb-8"
        >
          ← Back to Analysis
        </Button>

        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Interface Humanization Score</CardTitle>
            <div className="text-sm text-muted-foreground">{url}</div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-6xl font-bold">{totalScore}</div>
              <Progress value={totalScore} className="w-full h-4" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {criteria.map((criterion, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{criterion.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={(criterion.score / 20) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {criterion.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
