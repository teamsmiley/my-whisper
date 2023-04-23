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
model = whisper.load_model("tiny") 
# model = whisper.load_model("base")
# model = whisper.load_model("small")
# model = whisper.load_model("medium")
# model = whisper.load_model("large-v2")
start = time.time()

file = "app/audio/kr.mp3"
result = model.transcribe(file)
print(result["text"])
end = time.time()
print("The time of execution of above program is :", (end-start) * 1000, "ms")

# load audio and pad/trim it to fit 30 seconds
# audio = whisper.load_audio(file)
# audio = whisper.pad_or_trim(audio)

# # make log-Mel spectrogram and move to the same device as the model
# mel = whisper.log_mel_spectrogram(audio).to(model.device)

# # detect the spoken language
# _, probs = model.detect_language(mel)
# print(f"Detected language: {max(probs, key=probs.get)}")

# # decode the audio
# options = whisper.DecodingOptions()
# result = whisper.decode(model, mel, options)
# print(result.text)

# end = time.time()
# print("The time of execution of above program is :", (end-start) * 1000, "ms")
