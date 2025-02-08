from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from pathlib import Path
from datetime import datetime
from typing import List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and scaler
model_path = Path(__file__).parent.parent / "lib" / "ml-models" / "best_model.pkl"
scaler_path = Path(__file__).parent.parent / "lib" / "ml-models" / "scaler.pkl"

try:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
except Exception as e:
    print(f"Error loading model: {e}")
    raise

# Store prediction history in memory
prediction_history = []

class PredictionInput(BaseModel):
    bloodGlucose: float
    systolicBP: float
    diastolicBP: float
    age: float
    heartRate: float

class PredictionOutput(BaseModel):
    risk_level: str
    probability: float
    timestamp: datetime

class PredictionHistory(BaseModel):
    predictions: List[PredictionOutput]

@app.post("/predict", response_model=PredictionOutput)
async def predict(input_data: PredictionInput):
    try:
        # Convert input data to numpy array
        features = np.array([[
            input_data.bloodGlucose,
            input_data.systolicBP,
            input_data.diastolicBP,
            input_data.age,
            input_data.heartRate
        ]])
        
        # Scale the features
        scaled_features = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(scaled_features)
        probabilities = model.predict_proba(scaled_features)
        
        # Get the highest probability
        max_prob = max(probabilities[0])
        
        # Map prediction to risk level
        risk_levels = {0: "Low Risk", 1: "Medium Risk", 2: "High Risk"}
        risk_level = risk_levels[prediction[0]]
        
        result = PredictionOutput(
            risk_level=risk_level,
            probability=float(max_prob),
            timestamp=datetime.now()
        )
        
        # Store prediction in history
        prediction_history.append(result)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history", response_model=PredictionHistory)
async def get_history():
    return PredictionHistory(predictions=prediction_history)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001) 