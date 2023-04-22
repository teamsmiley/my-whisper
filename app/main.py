from fastapi import FastAPI
import whisper
import torch
import time
import os
from threading import Lock

app = FastAPI()

model_name= os.getenv("ASR_MODEL", "base")

@app.get("/")
def read_root():
    if torch.cuda.is_available():
        device = torch.device("cuda")
        print("Using GPU:", torch.cuda.get_device_name(0))
    else:
        device = torch.device("cpu")
        print("Using CPU")
    if torch.cuda.is_available():
        model = whisper.load_model(model_name).cuda()
    else:
        model = whisper.load_model(model_name)
    model_lock = Lock()

    start = time.time()

    file = "app/audio/kr.mp3"
    result = model.transcribe(file)
    # print(result["text"])

    end = time.time()
    print("The time of execution of above program is :", (end-start) * 1000, "ms")

    return {"content": result["text"]}

