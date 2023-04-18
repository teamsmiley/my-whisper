import whisper

import torch

if torch.cuda.is_available():
    device = torch.device("cuda")
    print("Using GPU:", torch.cuda.get_device_name(0))
else:
    device = torch.device("cpu")
    print("Using CPU")


print("lets start read file ")

model = whisper.load_model("large-v2")
result = model.transcribe("audio.mp3")
print(result["text"])