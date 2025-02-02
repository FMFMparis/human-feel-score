import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlSchema } from "@/lib/validators";
import { useLocation } from "wouter";
import { Heart, User2, LineChart, Smile } from "lucide-react";

const formSchema = z.object({
  url: urlSchema,
});

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
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
      setLocation(`/results?url=${encodeURIComponent(values.url)}&score=${data.score}`);
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
      <main className="max-w-[1200px] mx-auto px-4">
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="space-y-8 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight">
              Interface Humanization Score
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Évaluez le potentiel d'engagement émotionnel de votre interface web
            </p>
            <Card className="max-w-lg mx-auto bg-background border border-border/50">
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
                              placeholder="Entrez l'URL du site (ex: https://example.com)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-12 text-base font-light">
                      Analyser l'interface
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Heart,
                title: "Impact Émotionnel",
                description: "Évaluez la connexion émotionnelle avec vos utilisateurs",
              },
              {
                icon: User2,
                title: "Engagement Utilisateur",
                description: "Mesurez le potentiel d'interactions significatives",
              },
              {
                icon: LineChart,
                title: "Analyse Détaillée",
                description: "Obtenez des insights complets sur votre score d'humanisation",
              },
              {
                icon: Smile,
                title: "Expérience Utilisateur",
                description: "Comprenez l'impact de votre design sur la satisfaction",
              },
            ].map((feature, i) => (
              <div key={i} className="group space-y-4 p-6">
                <feature.icon className="w-8 h-8 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}