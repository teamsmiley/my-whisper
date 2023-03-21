FROM python:3.9
WORKDIR /app

# RUN apt purge nvidia* 
# RUN add-apt-repository ppa:graphics-drivers
# RUN apt install nvidia-515
RUN apt update 
RUN apt install ffmpeg -y
RUN pip install -U openai-whisper

COPY app/ /app/



