from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from app.pipelines.live_resolver import live_resolver
import json
import asyncio

router = APIRouter()

@router.get("/stream")
async def stream_analysis(q: str = Query(...)):
    async def event_generator():
        async for event in live_resolver.resolve(q):
            yield f"data: {json.dumps(event)}\n\n"
            await asyncio.sleep(0.1) # small delay for smoother streaming

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@router.get("/sync")
async def sync_analysis(q: str = Query(...)):
    # Returns final result only
    final_event = None
    async for event in live_resolver.resolve(q):
        if event.get("stage") == "final":
            final_event = event
    return final_event
