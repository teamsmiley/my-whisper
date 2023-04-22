from fastapi import FastAPI, Path
import whisper
import torch
import time
import os
from threading import Lock

app = FastAPI()

model_name= os.getenv("ASR_MODEL", "base")

@app.get("/")
def read_root():
    print("model:",model_name)
    if torch.cuda.is_available():
        model = whisper.load_model(model_name).cuda()
        print("Using GPU:", torch.cuda.get_device_name(0))
    else:
        model = whisper.load_model(model_name)
        print("Using CPU")
    model_lock = Lock()

    start = time.time()

    file = "app/audio/kr.mp3"
    result = model.transcribe(file)

    end = time.time()
    print("The time of execution of above program is :", (end-start))

    return {"content": result["text"],"processing_seconds": (end-start)}

