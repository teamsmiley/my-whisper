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
# model = whisper.load_model("tiny") 
# model = whisper.load_model("base") 
model = whisper.load_model("small")
# model = whisper.load_model("medium")
# model = whisper.load_model("large-v2") 
start = time.time()
result = model.transcribe("audio.mp3")
print(result["text"])
end = time.time()
print("The time of execution of above program is :", (end-start) * 1000, "ms")

