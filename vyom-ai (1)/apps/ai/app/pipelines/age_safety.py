import json
import os
from typing import Dict, List

class AgeSafetyEngine:
    def __init__(self):
        # Load hard rules from JSON
        data_path = os.path.join(os.path.dirname(__file__), "..", "data", "ingredient_age_rules.json")
        try:
            with open(data_path, "r") as f:
                self.rules = json.load(f)
        except Exception:
            self.rules = []

    def evaluate(self, ingredients: List[str]) -> Dict[str, bool]:
        """
        Evaluates safety for [adult, teen, child, infant]
        Returns a dictionary of safety boolean flags
        """
        results = {"adult": True, "teen": True, "child": True, "infant": True}
        reasons = []

        # Standard hard rules from prompt
        for ing in [i.lower() for i in ingredients]:
            # Rule: Alcohol
            if any(x in ing for x in ["alcohol", "ethanol", "wine", "beer", "whisky", "vodka"]):
                results["child"] = False
                results["infant"] = False
                reasons.append("Alcohol detected (unsafe for children/infants)")
            
            # Rule: Honey
            if "honey" in ing:
                results["infant"] = False
                reasons.append("Honey detected (botulism risk for infants)")

            # Rule: Caffeine
            if "caffeine" in ing:
                results["child"] = False
                results["infant"] = False
                reasons.append("Caffeine detected (unsafe for children/infants)")
            
            # Rule: Retinol/Salicylic Acid (Skincare)
            if any(x in ing for x in ["retinol", "salicylic acid", "paraben"]):
                results["infant"] = False
                reasons.append("Restricted skincare ingredients (unsafe for infants)")

            # Cross-reference with JSON data
            for rule in self.rules:
                if rule["id"] in ing:
                    if not rule["adult"]: results["adult"] = False
                    if not rule["teen"]: results["teen"] = False
                    if not rule["child"]: results["child"] = False
                    if not rule["infant"]: results["infant"] = False
                    reasons.append(rule["reason"])

        # Deduplicate reasons
        reasons = list(set(reasons))
        
        return {
            "safety_flags": results,
            "reasons": reasons
        }
