
from pydantic import BaseModel, Field, model_validator
from typing import List

class Point(BaseModel):
    lat: float = Field(..., description="Latitude as float")
    lng: float = Field(..., description="Longitude as float")

class PointsPayload(BaseModel):
    points: List[Point]

    # @model_validator(mode="before")
    # def check_points_present(cls, values):
    #     points = values.get("points") if isinstance(values, dict) else None
    #     if points is None:
    #         raise ValueError("Field 'points' is required and must be a non-empty array")
    #     if not isinstance(points, list) or len(points) == 0:
    #         raise ValueError("'points' must be a non-empty array")
    #     return values
