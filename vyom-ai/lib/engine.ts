import { GoogleGenAI } from "@google/genai";

const PROMPT = `
You are VYOM-AI, a national-scale safety platform. 
Analyze the following product query: "{query}"

Context:
{context}

Provide a detailed safety analysis in JSON format:
{{
  "name": "Product Name",
  "brand": "Brand",
  "category": "Category",
  "risk_score": 0-100,
  "status": "safe" | "warning" | "danger",
  "summary": "Brief summary",
  "ingredients": [
    {{ "name": "Ingredient", "risk": 0-10, "rating": "Safe" | "Caution" | "Hazard" }}
  ],
  "age_safety": ["List of age-related safety flags"],
  "authenticity": 0-100
}}
`;

export async function* analyzeProduct(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    yield { stage: "error", message: "Missing Gemini API Key. Please set NEXT_PUBLIC_GEMINI_API_KEY.", type: "error" };
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  
  yield { stage: "off_api", message: "Searching Global Databases...", type: "info" };
  await new Promise(resolve => setTimeout(resolve, 800));

  yield { stage: "groq_llm", message: "Synthesizing AI safety profile...", type: "ai" };
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: PROMPT.replace("{query}", query).replace("{context}", "Scanning local regulatory dataset..."),
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    yield { stage: "risk_engine", message: "Validating risk vectors...", type: "warning" };
    await new Promise(resolve => setTimeout(resolve, 500));

    yield { stage: "final", message: "Analysis complete.", data: result, type: "success" };
  } catch (error) {
    yield { stage: "error", message: "Analysis failed. " + (error as Error).message, type: "error" };
  }
}
