import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib
from pathlib import Path

# Sample data (replace this with your actual training data)
X = np.array([
    # Blood Glucose, Systolic BP, Diastolic BP, Age, Heart Rate
    [95, 120, 80, 25, 75],  # Low risk
    [180, 160, 100, 45, 90],  # High risk
    [140, 130, 85, 35, 80],  # Medium risk
    [90, 110, 75, 28, 72],  # Low risk
    [200, 170, 110, 50, 95],  # High risk
    [150, 140, 90, 40, 85],  # Medium risk
])

# Labels: 0 for Low Risk, 1 for Medium Risk, 2 for High Risk
y = np.array([0, 2, 1, 0, 2, 1])

# Create and train the scaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Create and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_scaled, y)

# Save the model and scaler
model_dir = Path(__file__).parent.parent / "lib" / "ml-models"
model_dir.mkdir(parents=True, exist_ok=True)

joblib.dump(model, model_dir / "best_model.pkl")
joblib.dump(scaler, model_dir / "scaler.pkl")

print("Model and scaler have been saved successfully!") 