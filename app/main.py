from fastapi import FastAPI, File, UploadFile
import whisper
import torch
import ffmpeg
import numpy as np
import os
from threading import Lock
from typing import BinaryIO
from fastapi.responses import StreamingResponse, RedirectResponse

print 
app = FastAPI()

SAMPLE_RATE=16000

model_name= os.getenv("ASR_MODEL", "base")

if torch.cuda.is_available():
    model = whisper.load_model(model_name).cuda()
else:
    model = whisper.load_model(model_name)
model_lock = Lock()

# asr : Automatic Speech Recognition(자동 음성 인식)
@app.post("/asr")
def transcribe(
                audio_file: UploadFile = File(...),
                ):
    audio = load_audio(audio_file.file)
    with model_lock:   
        result = model.transcribe(audio)
    return result

@app.get("/", response_class=RedirectResponse, include_in_schema=False)
async def index():
    return "/docs"

@app.get("/help")
def help():
    print("model:",model_name)
    deviceName = ""
    if torch.cuda.is_available():
        deviceName = torch.cuda.get_device_name(0)
        print("Using GPU:", deviceName)
    else:
        deviceName = "CPU"
        print("Using CPU")
    return {"model": model_name,"GPU": deviceName}

def load_audio(file: BinaryIO, sr: int = SAMPLE_RATE):
    """
    Open an audio file object and read as mono waveform, resampling as necessary.
    Modified from https://github.com/openai/whisper/blob/main/whisper/audio.py to accept a file object
    Parameters
    ----------
    file: BinaryIO
        The audio file like object
    sr: int
        The sample rate to resample the audio if necessary
    Returns
    -------
    A NumPy array containing the audio waveform, in float32 dtype.
    """
    try:
        # This launches a subprocess to decode audio while down-mixing and resampling as necessary.
        # Requires the ffmpeg CLI and `ffmpeg-python` package to be installed.
        out, _ = (
            ffmpeg.input("pipe:", threads=0)
            .output("-", format="s16le", acodec="pcm_s16le", ac=1, ar=sr)
            .run(cmd="ffmpeg", capture_stdout=True, capture_stderr=True, input=file.read())
        )
    except ffmpeg.Error as e:
        raise RuntimeError(f"Failed to load audio: {e.stderr.decode()}") from e

    return np.frombuffer(out, np.int16).flatten().astype(np.float32) / 32768.0