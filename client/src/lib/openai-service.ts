import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ToneAnalysis {
  tone: string;
  formality: number;
  engagement: number;
  recommendations: string[];
}

export async function analyzeTone(text: string): Promise<ToneAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Vous êtes un expert en analyse de tonalité et d'engagement pour les sites web. Analysez le texte fourni et évaluez sa tonalité, son niveau de formalité et son potentiel d'engagement. Répondez en JSON avec les champs : tone (string), formality (number 0-1), engagement (number 0-1), recommendations (array of strings)"
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      tone: result.tone || "Neutre",
      formality: Math.max(0, Math.min(1, result.formality || 0.5)),
      engagement: Math.max(0, Math.min(1, result.engagement || 0.5)),
      recommendations: result.recommendations || []
    };
  } catch (error) {
    console.error('Error analyzing tone:', error);
    throw new Error("Failed to analyze text tone");
  }
}