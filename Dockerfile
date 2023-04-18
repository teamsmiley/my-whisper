FROM python:3.9

RUN apt update 
RUN apt install ffmpeg -y
RUN pip install -U openai-whisper
# RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# WORKDIR /app

# COPY app/ /app/



