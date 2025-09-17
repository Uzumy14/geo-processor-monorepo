from pydantic import BaseModel, Field, field_validator, ValidationInfo
from typing import List

class Point(BaseModel):
    lat: float = Field(..., ge=-90, le=90, description="Latitude between -90 and 90")
    lng: float = Field(..., ge=-180, le=180, description="Longitude between -180 and 180")

class PointsPayload(BaseModel):
    points: List[Point] = Field(..., min_length=1, description="At least one point required")
    
    @field_validator('points')
    @classmethod
    def validate_points_not_empty(cls, v):
        if not v:
            raise ValueError("Points array cannot be empty")
        return v