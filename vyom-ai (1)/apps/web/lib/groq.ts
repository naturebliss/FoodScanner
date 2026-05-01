import Groq from "groq-sdk";

let groqClient: Groq | null = null;

export function getGroqClient() {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is missing from environment variables");
    }
    groqClient = new Groq({
      apiKey: apiKey,
    });
  }
  return groqClient;
}

export async function analyzeProduct(query: string, context: string) {
  const client = getGroqClient();

  try {
    const params: any = {
      messages: [
        {
          role: "system",
          content: `You are VYOM-AI, a product safety intelligence expert. 
          Analyze the provided product and context.
          Return a JSON object with: 
          { 
            "product": string, 
            "brand": string, 
            "score": number (0-100 risk score), 
            "ingredients": Array<{name: string, risk: "low"|"medium"|"high", reason: string}>,
            "ageSafety": { "adult": boolean, "teen": boolean, "child": boolean, "infant": boolean }
          }`,
        },
        {
          role: "user",
          content: `Analyze this product: ${query}\n\nContext:\n${context}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    };

    const completion = await client.chat.completions.create(params);
    return JSON.parse(completion.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Groq AI Error:", error);
    throw error;
  }
}
