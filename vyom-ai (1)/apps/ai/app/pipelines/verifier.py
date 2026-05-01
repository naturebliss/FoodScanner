import re
from typing import List, Dict, Any

class SafetyVerifier:
    def __init__(self, additives_data: List[Dict]):
        self.additives = additives_data

    def cross_reference(self, ingredients: List[str]) -> List[Dict[str, Any]]:
        identified = []
        for ing in ingredients:
            match = self._find_match(ing)
            if match:
                identified.append({
                    "name": ing,
                    "match": match["name"],
                    "status": match["status"],
                    "limit": match.get("limit"),
                    "details": match.get("details")
                })
        return identified

    def _find_match(self, ing_name: str) -> Dict:
        ing_lower = ing_name.lower()
        for add in self.additives:
            if add["code"].lower() in ing_lower or add["name"].lower() in ing_lower:
                return add
        return None

# Example usage with real FSSAI codes
def get_verifier():
    # Load from JSON data
    import os
    import json
    path = os.path.join(os.path.dirname(__file__), "..", "data", "fssai_additives.json")
    with open(path, "r") as f:
        data = json.load(f)
    return SafetyVerifier(data)
