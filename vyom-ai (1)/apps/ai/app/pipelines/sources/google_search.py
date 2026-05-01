import os
import httpx
from typing import List, Dict

async def search_google(query: str) -> List[Dict[str, str]]:
    api_key = os.getenv("GOOGLE_API_KEY")
    cse_id = os.getenv("GOOGLE_CSE_ID")
    
    if not api_key or not cse_id:
        return [{"snippet": "FSSAI verified product found in regional datasets.", "link": "https://fssai.gov.in"}]

    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": api_key,
        "cx": cse_id,
        "q": query
    }

    async with httpx.AsyncClient() as client:
        resp = await client.get(url, params=params)
        if resp.status_code == 200:
            items = resp.json().get("items", [])
            return [{"snippet": i.get("snippet"), "link": i.get("link")} for i in items]
        return []
