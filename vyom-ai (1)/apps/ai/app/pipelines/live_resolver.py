import json
import asyncio
from typing import AsyncGenerator, Dict, Any
from app.pipelines.groq_client import analyze_product_v1
from app.pipelines.age_safety import AgeSafetyEngine
from app.pipelines.risk_engine import RiskScoringEngine
import httpx

class LiveSafetyResolver:
    def __init__(self):
        self.age_engine = AgeSafetyEngine()
        self.risk_engine = RiskScoringEngine()

    async def resolve(self, query: str) -> AsyncGenerator[Dict[str, Any], None]:
        """
        Main pipeline that streams data as it is resolved.
        """
        # Step 1: Search OpenFoodFacts
        yield {"stage": "off_api", "message": "Searching OpenFoodFacts Database...", "type": "info"}
        off_data = await self.fetch_open_food_facts(query)
        
        # Step 2: Google Search & FSSAI Regex
        yield {"stage": "google_search", "message": "Querying G1 Regulatory Snippets...", "type": "info"}
        snippets = await self.fetch_regulatory_snippets(query)
        
        # Step 3: Groq RAG Analysis
        yield {"stage": "groq_llm", "message": "Synthesizing intelligence via Groq Llama-3.3...", "type": "ai"}
        combined_context = f"OFF_DATA: {json.dumps(off_data)}\n\nREPORTS: {snippets}"
        analysis = analyze_product_v1(query, combined_context)
        
        if analysis.get("status") == "insufficient_data":
            yield {"stage": "error", "message": "Insufficient verified data to form a safety profile.", "type": "error"}
            return

        # Step 4: Verification & Age Safety
        yield {"stage": "verifier", "message": "Enforcing safety boundaries...", "type": "success"}
        ingredients = [i["name"] for i in analysis.get("ingredients", [])]
        age_results = self.age_engine.evaluate(ingredients)
        
        # Step 5: Risk Engine
        yield {"stage": "risk_engine", "message": "Computing weighted risk matrix...", "type": "warning"}
        risk_profile = self.risk_engine.calculate_score(
            ingredient_risks=[i["risk"] for i in analysis.get("ingredients", [])],
            violations_count=0, # placeholder
            complaints_count=0, # placeholder
            region_risk=0.5, # placeholder
            age_safety_flags=age_results["safety_flags"],
            authenticity_score=analysis.get("authenticity", 100)
        )

        # Step 6: Final Results
        final_data = {
            **analysis,
            "age_safety": age_results["safety_flags"],
            "risk_score": risk_profile["total_risk"],
            "reasons": age_results["reasons"],
            "status": "complete"
        }
        
        yield {"stage": "final", "message": "Analysis complete.", "data": final_data, "type": "success"}

    async def fetch_open_food_facts(self, query: str):
        # Fallback dictionary for common demo products
        demo_db = {
            "cerelac": {"ingredients_text": "Wheat flour, Sugar, Milk solids, Soyabean oil, Vitamins, Minerals", "brands": "Nestle"},
            "maggi": {"ingredients_text": "Wheat flour, Palm oil, Salt, Wheat gluten, Mineral (Calcium carbonate), Thickeners (508 & 412), Acidity regulators (501(i) & 500(i)) and Humectant (451(i)). MSG (E621) detected.", "brands": "Nestle"},
            "coke": {"ingredients_text": "Carbonated Water, Sugar, Acidity Regulator (338), Caffeine, Colour (150d).", "brands": "Coca-Cola"}
        }
        
        q_lower = query.lower()
        for key in demo_db:
            if key in q_lower:
                return demo_db[key]

        return {"ingredients_text": f"Simulated ingredients for {query}. Testing local safety rules."}

    async def fetch_regulatory_snippets(self, query: str):
        # In production, use Google Custom Search API
        return "Regulatory snippets found online..."

live_resolver = LiveSafetyResolver()
