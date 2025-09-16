
import pytest
from app.service import compute_bounds_and_centroid
from app.schemas import Point

def test_compute_simple():
    pts = [Point(lat=40.0, lng=-75.0), Point(lat=30.0, lng=-80.0)]
    res = compute_bounds_and_centroid(pts)
    assert res["bounds"]["north"] == 40.0
    assert res["bounds"]["south"] == 30.0
    assert res["bounds"]["east"] == -75.0
    assert res["bounds"]["west"] == -80.0
    assert pytest.approx(res["centroid"]["lat"], rel=1e-6) == 35.0
    assert pytest.approx(res["centroid"]["lng"], rel=1e-6) == -77.5

def test_empty_error():
    with pytest.raises(ValueError):
        compute_bounds_and_centroid([])
