import torch
import torch.nn as nn
from fastapi import FastAPI, UploadFile, File
from torchvision import models, transforms
from PIL import Image
import io

# -------------------------------
# 1. Create FastAPI app
# -------------------------------
app = FastAPI()

# -------------------------------
# 2. Load EfficientNet model ONCE
# -------------------------------
MODEL_PATH = "efficientnet_best.pth"

model = models.efficientnet_b0(weights=None)
model.classifier[1] = nn.Linear(
    model.classifier[1].in_features,
    2
)

model.load_state_dict(
    torch.load(MODEL_PATH, map_location="cpu")
)
model.eval()

# -------------------------------
# 3. Image transform
# -------------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# -------------------------------
# 4. Prediction API
# -------------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

    x = transform(img).unsqueeze(0)

    with torch.no_grad():
        y = model(x)
        pred = torch.argmax(y, dim=1).item()

    return {
        "class_id": pred
    }
