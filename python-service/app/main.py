
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from .schemas import PointsPayload
from .service import compute_bounds_and_centroid

app = FastAPI(title="Geo Processor - Python Service", version="0.1.0")

@app.post("/process-points")
async def process_points(payload: PointsPayload):
    try:
        result = compute_bounds_and_centroid(payload.points)
        return JSONResponse(content=result)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as ex:
        raise HTTPException(status_code=400, detail=str(ex))

@app.get("/health")
def health():
    return {"status": "ok"}
