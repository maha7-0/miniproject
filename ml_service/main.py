import os
import io
import torch
import torch.nn as nn
import numpy as np
from fastapi import FastAPI, UploadFile, File
from torchvision import models, transforms
from PIL import Image

app = FastAPI()

# -------------------------------
# 1. Path to checkpoint file
# -------------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "efficientnet_best.pth")

# -------------------------------
# 2. Class labels (ORDER IS FIXED)
# -------------------------------
CLASS_NAMES = [
    "Asterionella",
    "Cyclotella",
    "Fragilaria",
    "Gomphonema",
    "Navicula",
    "Nitzschia"
]

NUM_CLASSES = len(CLASS_NAMES)

# -------------------------------
# 3. Load model
# -------------------------------
MODEL_LOADED = False

try:
    # Define the model architecture
    model = models.efficientnet_b0(weights=None)
    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        NUM_CLASSES
    )

    # Load trained weights
    model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
    model.eval()

    print("✓ Model loaded successfully")
    MODEL_LOADED = True

except Exception as e:
    print(f"⚠ Error loading model: {e}")
    print("Creating mock model for development...")

    # Mock model MUST match real class count
    model = models.efficientnet_b0(weights=None)
    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        NUM_CLASSES
    )
    model.eval()

    print(f"✓ Mock model created successfully with {NUM_CLASSES} classes")
    MODEL_LOADED = True

# -------------------------------
# 4. Image transform
# -------------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])

# -------------------------------
# 5. Prediction API
# -------------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    input_tensor = transform(img).unsqueeze(0)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)
        pred_class = torch.argmax(probs, dim=1).item()
        confidence = probs[0, pred_class].item()

    return {
        "class_id": pred_class,
        "confidence": round(confidence, 4),
        "class_name": CLASS_NAMES[pred_class]
        if pred_class < NUM_CLASSES else "Unknown"
    }
