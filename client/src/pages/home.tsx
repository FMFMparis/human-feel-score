import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlSchema } from "@/lib/validators";
import { useState } from "react";

const formSchema = z.object({
  url: urlSchema,
});

type AnalysisResult = {
  score: number;
  details: Array<{
    category: string;
    score: number;
    maxScore: number;
    details: string[];
  }>;
};

export default function Home() {
  const { toast } = useToast();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to analyze URL");

      const data = await res.json();
      setResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze the URL. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-[800px] mx-auto px-4 py-12">
        <h1 className="text-4xl font-light text-center mb-8">
          Testez l'humanisation de votre site
        </h1>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-12 px-4 text-base"
                          placeholder="Entrez une URL..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 text-base font-light">
                  Analyser
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-center">
              Score : {result.score}/100
            </h2>

            <div className="space-y-8">
              <h3 className="text-2xl font-light">Détails</h3>
              {result.details.map((category, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-xl font-medium">{category.category}</h4>
                  <p className="text-muted-foreground">
                    Score: {category.score}/{category.maxScore}
                  </p>
                  {category.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {category.details.map((detail, i) => (
                        <li key={i} className="text-muted-foreground">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}