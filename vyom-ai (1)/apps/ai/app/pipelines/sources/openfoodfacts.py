import os
import json
from typing import Dict, Any, List

class OpenFoodFactsClient:
    def __init__(self):
        self.base_url = "https://world.openfoodfacts.org/api/v2"

    async def get_product(self, barcode: str) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{self.base_url}/product/{barcode}.json")
            if resp.status_code == 200:
                data = resp.json()
                if data.get("status") == 1:
                    return data["product"]
            return {}

    async def search_product(self, query: str) -> List[Dict[str, Any]]:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{self.base_url}/search?search_terms={query}&json=true&page_size=5")
            if resp.status_code == 200:
                return resp.json().get("products", [])
            return []

import httpx
off_client = OpenFoodFactsClient()
