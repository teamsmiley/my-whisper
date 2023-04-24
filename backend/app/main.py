from fastapi import FastAPI, File, UploadFile, Query , WebSocket
import whisper
from whisper.utils import ResultWriter, WriteTXT, WriteSRT, WriteVTT, WriteTSV, WriteJSON
from whisper import tokenizer
import torch
import ffmpeg
import numpy as np
import os
from threading import Lock
from typing import BinaryIO, Union
from fastapi.responses import StreamingResponse, RedirectResponse
from io import StringIO

app = FastAPI()

SAMPLE_RATE=16000
LANGUAGE_CODES=sorted(list(tokenizer.LANGUAGES.keys()))

model_name= os.getenv("ASR_MODEL", "base")
deviceType=""
deviceName = ""

if torch.cuda.is_available():
    deviceType = "GPU"
    deviceName = torch.cuda.get_device_name(0)
    print("Using GPU:", deviceName)
    model = whisper.load_model(model_name).cuda()
else:
    deviceType = "CPU"
    print("Using CPU")
    model = whisper.load_model(model_name)
model_lock = Lock()

print("Device Type:", deviceType)
if(deviceType == "GPU"):
    print("Device Name:", deviceName)

@app.get("/", response_class=RedirectResponse, include_in_schema=False)
async def index():
    return "/docs"

@app.get("/health")
def health():
    return {"model": model_name,"deviceType": deviceType, "deviceName": deviceName}

# asr : Automatic Speech Recognition(자동 음성 인식)
@app.post("/asr")
def transcribe(
                audio_file: UploadFile = File(...),
                language: Union[str, None] = Query(default=None, enum=LANGUAGE_CODES),
                task : Union[str, None] = Query(default="transcribe", enum=["transcribe", "translate"]),
                initial_prompt: Union[str, None] = Query(default=None),
                ):
    audio = load_audio(audio_file.file)
    options_dict = {"language" : language  }
    if task:
        options_dict["task"] = task
    if initial_prompt:
        options_dict["initial_prompt"] = initial_prompt   
    with model_lock:   
        result = model.transcribe(audio, **options_dict)
    return result["text"]


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

@app.post("/lang")
def language_detection(
                audio_file: UploadFile = File(...),
                ):

    # load audio and pad/trim it to fit 30 seconds
    audio = load_audio(audio_file.file)
    audio = whisper.pad_or_trim(audio)

    # make log-Mel spectrogram and move to the same device as the model
    mel = whisper.log_mel_spectrogram(audio).to(model.device)

    # detect the spoken language
    with model_lock:
        _, probs = model.detect_language(mel)
    detected_lang_code = max(probs, key=probs.get)
    
    result = { "detected_language": tokenizer.LANGUAGES[detected_lang_code],"language_code" : detected_lang_code }

    return result

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        print("===")
        data = await websocket.receive_text()
        print("Receive Message:", data)
        await websocket.send_text(data)
