FROM python:3.9

RUN apt update 
RUN apt install ffmpeg -y
RUN pip install -U openai-whisper
# RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

RUN pip install fastapi[all]
WORKDIR /app

COPY app/ /app/

ENTRYPOINT ["gunicorn", "--bind", "0.0.0.0:9000", "--workers", "1", "--timeout", "0", "app.webservice:app", "-k", "uvicorn.workers.UvicornWorker"]


