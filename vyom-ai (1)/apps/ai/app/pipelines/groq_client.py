import os
from groq import Groq
import json

client = None

def get_groq_client():
    global client
    if client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            return None
        client = Groq(api_key=api_key)
    return client

def analyze_product_v1(query: str, context: str):
    groq = get_groq_client()
    
    if not groq:
        # FALLBACK: Mock Analysis if no API Key
        return {
            "product": query,
            "brand": "Standard Brand (Mock)",
            "score": 45,
            "authenticity": 100,
            "confidence": 50,
            "ingredients": [
                {"name": "Ingredient A", "risk": "low", "reason": "Verified safe by FSSAI"},
                {"name": "Ingredient B", "risk": "medium", "reason": "Borderline concentration"}
            ],
            "ageSafety": {"adult": True, "teen": True, "child": True, "infant": False},
            "sources": ["https://world.openfoodfacts.org"]
        }

    try:
        completion = groq.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are VYOM-AI, a product safety intelligence expert. Analyze the provided product and context from OpenFoodFacts and search snippets. Return a JSON object with: product, brand, score (0-100 risk), authenticity (0-100), confidence, ingredients (array with name, risk[low/medium/high], reason), ageSafety (boolean flags for adult, teen, child, infant), sources (array)."},
                {"role": "user", "content": f"Analyze this product: {query}\n\nContext:\n{context}"}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        print(f"Groq Error: {e}")
        return {"status": "error", "message": str(e)}
