from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_process_points_valid():
    response = client.post("/process-points", json={
        "points": [
            {"lat": 40.7128, "lng": -74.0060},
            {"lat": 34.0522, "lng": -118.2437}
        ]
    })
    assert response.status_code == 200
    data = response.json()
    assert "centroid" in data
    assert "bounds" in data
    assert "lat" in data["centroid"]

def test_process_points_invalid():
    response = client.post("/process-points", json={})
    assert response.status_code == 422
