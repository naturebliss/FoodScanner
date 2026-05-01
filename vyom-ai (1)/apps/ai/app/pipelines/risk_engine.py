from typing import Dict, List, Any

class RiskScoringEngine:
    """
    Weighted scoring: 
    ingredient_risk(40%) + violations(20%) + complaints(15%) + region(10%) + age(10%) + authenticity(5%)
    """
    
    @staticmethod
    def calculate_score(
        ingredient_risks: List[str], # ['high', 'medium', 'low']
        violations_count: int,
        complaints_count: int,
        region_risk: float, # 0.0 to 1.0
        age_safety_flags: Dict[str, bool],
        authenticity_score: int # 0 to 100
    ) -> Dict[str, Any]:
        
        # 1. Ingredient Risk (40%)
        # high = 100, medium = 50, low = 0
        ing_score = 0
        if "high" in ingredient_risks: ing_score = 100
        elif "medium" in ingredient_risks: ing_score = 50
        
        # 2. Violations (20%)
        # 1 violation = 50, 2+ = 100
        v_score = min(violations_count * 50, 100)
        
        # 3. Complaints (15%)
        # 3+ complaints = 100
        c_score = min((complaints_count / 3.0) * 100, 100)
        
        # 4. Regional risk (10%)
        r_score = region_risk * 100
        
        # 5. Age Safety (10%)
        # If unsafe for any age, increase score
        a_score = 0
        if not all(age_safety_flags.values()):
            a_score = 100
            
        # 6. Authenticity (5%)
        # Flip authenticity: 100 (genuine) -> 0 (risk), 0 (fake) -> 100 (risk)
        auth_risk = 100 - authenticity_score
        
        total_score = (
            (ing_score * 0.40) + 
            (v_score * 0.20) + 
            (c_score * 0.15) + 
            (r_score * 0.10) + 
            (a_score * 0.10) + 
            (auth_risk * 0.05)
        )
        
        return {
            "total_risk": round(total_score, 1),
            "breakdown": {
                "ingredients": ing_score,
                "violations": v_score,
                "complaints": c_score,
                "regional": r_score,
                "age": a_score,
                "authenticity": auth_risk
            }
        }
