FROM python:3.9
WORKDIR /app

RUN apt update 
RUN apt install ffmpeg -y
RUN pip install -U openai-whisper
RUN pip install torch torchvision torchaudio
# RUN pip install fastapi "uvicorn[standard]"
COPY app/ /app/



