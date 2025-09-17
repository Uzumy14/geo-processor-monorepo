from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from .schemas import PointsPayload
from .service import compute_bounds_and_centroid
from pydantic import ValidationError
import json

app = FastAPI(title="Geo Processor - Python Service", version="0.1.0")

@app.post("/process-points")
async def process_points(request: Request):
    try:
        # Read the JSON directly for manual validation
        payload = await request.json()
        
        # Manual validation of the points field
        if 'points' not in payload:
            return JSONResponse(
                status_code=400,
                content={
                    "message": "Validation failed",
                    "error": "Missing 'points' field",
                    "statusCode": 400
                }
            )
        
        if not isinstance(payload['points'], list):
            return JSONResponse(
                status_code=400,
                content={
                    "message": "Validation failed",
                    "error": "Points must be an array",
                    "statusCode": 400
                }
            )
        
        if len(payload['points']) == 0:
            return JSONResponse(
                status_code=400,
                content={
                    "message": "Validation failed",
                    "error": "Points array cannot be empty",
                    "statusCode": 400
                }
            )
        
        # Now validate with Pydantic for point structure
        points_payload = PointsPayload(**payload)
        result = compute_bounds_and_centroid(points_payload.points)
        return JSONResponse(content=result)
        
    except ValidationError as ve:
        # Extract the first error message
        error_msg = str(ve.errors()[0]['msg']) if ve.errors() else "Validation failed"
        return JSONResponse(
            status_code=400,
            content={
                "message": "Validation failed",
                "error": error_msg,
                "statusCode": 400
            }
        )
    except Exception as ex:
        return JSONResponse(
            status_code=400,
            content={
                "message": "Processing failed",
                "error": str(ex),
                "statusCode": 400
            }
        )

@app.get("/health")
def health():
    return {"status": "ok"}