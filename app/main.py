from fastapi import FastAPI
import whisper
import torch
import time


app = FastAPI()

@app.get("/")
def read_root():
    if torch.cuda.is_available():
        device = torch.device("cuda")
        print("Using GPU:", torch.cuda.get_device_name(0))
    else:
        device = torch.device("cpu")
        print("Using CPU")
    return {"Hello": "World"}

