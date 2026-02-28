import random
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RollRequest(BaseModel):
    dice_type: int = Field (..., description="Number of sides on the dice (e.g. 4 for d4)")
    num_dice: int = Field (1, ge=1, le=6, description="How many dice to roll (1-6)")
    

class RollResponse(BaseModel):
    rolls: list[int] = Field (..., description="The individual rolls of the dice")
    critical_rolls: list[bool] = Field (..., description="Whether each roll was a critical hit (i.e. rolled the maximum value)")
    total: int = Field (..., description="The total sum of the rolls")

class DiceTypesResponse(BaseModel):
    dice_types: list[int] = Field (..., description="List of supported dice types (e.g. 4, 6, 8, 10, 12, 20)")

VALID_DICE = [4, 6, 8, 10, 12, 20]

@app.get("/")
def root():
    """Health check endpoint"""
    return {"message": "Crit Happens API is running!"}

@app.post("/roll", response_model=RollResponse)
def roll_dice(request: RollRequest) -> RollResponse:
    """Roll the specified number of dice of the given type."""

    # Validate dice type
    if request.dice_type not in VALID_DICE:
        raise HTTPException(status_code=400, detail=f"Invalid dice type d{request.dice_type}. Valid types are: {sorted(VALID_DICE)}.")
        
    rolls = [random.randint(1, request.dice_type) for _ in range(request.num_dice)]
    criticals = [r == request.dice_type for r in rolls]
    total = sum(rolls)
    return RollResponse(rolls=rolls, total=total, critical_rolls=criticals)

@app.get("/dice-types", response_model=DiceTypesResponse)
def get_dice_types() -> DiceTypesResponse:
    """Return the list of supported dice types."""
    return DiceTypesResponse(dice_types=sorted(VALID_DICE))