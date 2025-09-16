
from typing import List, Dict
from .schemas import Point

def compute_bounds_and_centroid(points: List[Point]) -> Dict:
    if not points:
        raise ValueError("points list is empty")

    lats = [p.lat for p in points]
    lngs = [p.lng for p in points]

    north = max(lats)
    south = min(lats)
    east = max(lngs)
    west = min(lngs)

    centroid_lat = sum(lats) / len(lats)
    centroid_lng = sum(lngs) / len(lngs)

    return {
        "centroid": {"lat": centroid_lat, "lng": centroid_lng},
        "bounds": {"north": north, "south": south, "east": east, "west": west},
    }
