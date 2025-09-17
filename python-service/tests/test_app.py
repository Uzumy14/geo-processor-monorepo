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
    assert response.status_code == 400
    data = response.json()
    assert data["error"] == "Missing 'points' field"
    assert data["message"] == "Validation failed"
    assert data["statusCode"] == 400

def test_process_points_empty_array():
    """Test that empty points array returns 400 error with specific message"""
    response = client.post("/process-points", json={
        "points": []
    })
    
    assert response.status_code == 400
    data = response.json()
    assert data == {
        "message": "Validation failed",
        "error": "Points array cannot be empty",
        "statusCode": 400
    }
    
def test_process_points_not_array():
    """Test that non-array points returns 400 error"""
    response = client.post("/process-points", json={
        "points": "not_an_array"
    })
    
    assert response.status_code == 400
    data = response.json()
    assert data["error"] == "Points must be an array"
    assert data["message"] == "Validation failed"
    assert data["statusCode"] == 400

def test_process_points_missing_lat():
    """Test that points with missing lat return validation error"""
    response = client.post("/process-points", json={
        "points": [
            {"lng": -74.0060},  # Missing lat
            {"lat": 34.0522, "lng": -118.2437}
        ]
    })
    assert response.status_code == 400
    data = response.json()
    assert "field required" in data["error"].lower() or "missing" in data["error"].lower()

def test_process_points_missing_lng():
    """Test that points with missing lng return validation error"""
    response = client.post("/process-points", json={
        "points": [
            {"lat": 40.7128},  # Missing lng
            {"lat": 34.0522, "lng": -118.2437}
        ]
    })
    assert response.status_code == 400
    data = response.json()
    assert "field required" in data["error"].lower() or "missing" in data["error"].lower()

def test_process_points_invalid_coordinates():
    """Test that invalid coordinates return validation error"""
    response = client.post("/process-points", json={
        "points": [
            {"lat": 100.0, "lng": -74.0060},  # Invalid lat (>90)
            {"lat": 34.0522, "lng": -200.0}    # Invalid lng (<-180)
        ]
    })
    assert response.status_code == 400
    data = response.json()
    assert any(phrase in data["error"] for phrase in ["less than or equal to 90", "greater than or equal to -180", "90", "180"])
