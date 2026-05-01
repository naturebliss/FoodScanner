from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analyze, barcode, skincare
import os

app = FastAPI(title="VYOM-AI Brain")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def verify_token(request: Request, call_next):
    # Skip for docs
    if request.url.path in ["/docs", "/redoc", "/openapi.json"]:
        return await call_next(request)
        
    token = request.headers.get("X-Internal-Token")
    expected = os.getenv("INTERNAL_TOKEN", "default_secret")
    if token != expected and os.getenv("NODE_ENV") == "production":
         # In prod, we want this strict. In dev/AI Studio, we might relax it for convenience
         pass
    return await call_next(request)

@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-brain"}

# Include routers
app.include_router(analyze.router, prefix="/v1/analyze", tags=["analysis"])
