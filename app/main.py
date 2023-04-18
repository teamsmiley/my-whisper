import whisper
import torch
import time

if torch.cuda.is_available():
    device = torch.device("cuda")
    print("Using GPU:", torch.cuda.get_device_name(0))
else:
    device = torch.device("cpu")
    print("Using CPU")

print("lets load module")
# model = whisper.load_model("tiny") # download 13 sec , transcribe: 5 sec
# model = whisper.load_model("base") # download 8 sec , transcribe: 6.2 sec
# model = whisper.load_model("small") # download 1:42 sec , transcribe: 7.5 sec
# model = whisper.load_model("medium") # download 1:42 sec , transcribe: 13.5 sec
model = whisper.load_model("large-v2") # download 1:42 sec , transcribe: 13.5 sec
start = time.time()
result = model.transcribe("audio.mp3")
print(result["text"])
end = time.time()
print("The time of execution of above program is :", (end-start) * 1000, "ms")