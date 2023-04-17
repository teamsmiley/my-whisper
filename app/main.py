import whisper

print("This line will be printed.")

model = whisper.load_model("large")
result = model.transcribe("audio.mp3")
print(result["text"])