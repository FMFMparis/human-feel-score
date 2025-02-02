import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlSchema } from "@/lib/validators";
import { useLocation } from "wouter";
import { BarChart3, Heart, LineChart, Smile, User } from "lucide-react";

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
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Interface Humanization Score
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Evaluate the emotional engagement potential of your web interface
                </p>
              </div>
              <Card className="w-full max-w-lg">
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter website URL (e.g., https://example.com)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" size="lg">
                        Analyze Interface
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Heart className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Emotional Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  Measure how well your interface connects with users on an emotional level
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <User className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  Evaluate the potential for meaningful user interactions
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  Get comprehensive insights into your interface's humanization score
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Smile className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>User Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  Understand how your design affects user satisfaction
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
