from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_dice_types():
    response = client.get("/dice-types")
    assert response.status_code == 200
    data = response.json()
    assert "dice_types" in data
    assert 20 in data["dice_types"]

def test_roll_single_die():
    response = client.post("/roll", json={"dice_type": 20, "number_of_dice": 1})
    assert response.status_code == 200
    data = response.json()
    assert len(data["rolls"]) == 1
    assert 1 <= data["rolls"][0] <= 20

def test_roll_multiple_dice():
    response = client.post("/roll", json={"dice_type": 6, "num_dice": 6})
    assert response.status_code == 200
    data = response.json()
    assert len(data["rolls"]) == 6
    for roll in data["rolls"]:
        assert 1 <= roll <= 6

def test_roll_values_in_range():
    for dice_type in [4, 6, 8, 10, 12, 20]:
        response = client.post("/roll", json={"dice_type": dice_type, "number_of_dice": 1})
        assert response.status_code == 200
        data = response.json()
        assert 1 <= data["rolls"][0] <= dice_type

def test_critical_detection():
    results: list[tuple[int, bool]] = []
    for _ in range(100):
        response = client.post("/roll", json={"dice_type": 20, "number_of_dice": 1})
        data = response.json()
        results.append((int(data["rolls"][0]), bool(data["critical_rolls"][0])))
    
    for roll, is_crit in results:
        if roll == 20:
            assert is_crit is True
        else:
            assert is_crit is False

def test_invalid_dice_type():
    response = client.post("/roll", json={"dice_type": 7, "num_dice": 1})
    assert response.status_code == 400

def test_invalid_number_of_dice():
    response = client.post("/roll", json={"dice_type": 20, "num_dice": 0})
    assert response.status_code == 422