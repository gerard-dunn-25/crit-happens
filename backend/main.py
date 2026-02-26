import random
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()

class RollRequest(BaseModel):
    dice_type: int = Field (..., description="Number of sides on the dice (e.g. 4 for d4)")
    num_dice: int = Field (1, ge=1, le=6, description="How many dice to roll (1-6)")

VALID_DICE = [4, 6, 8, 10, 12, 20]

@app.get("/")
def root():
    """Health check endpoint"""
    return {"message": "Crit Happens API is running!"}

@app.post("/roll")
def roll_dice(request: RollRequest):
    """Roll the specified number of dice of the given type."""

    # Validate dice type
    if request.dice_type not in VALID_DICE:
        raise HTTPException(status_code=400, detail=f"Invalid dice type d{request.dice_type}. Valid types are: {sorted(VALID_DICE)}.")
        
    rolls = [random.randint(1, request.dice_type) for _ in range(request.num_dice)]
    total = sum(rolls)
    return {"rolls": rolls, "total": total}

@app.get("/dice-types")
def get_dice_types():
    """Return the list of supported dice types."""
    return {"dice_types": sorted(VALID_DICE)}