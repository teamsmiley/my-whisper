FROM python:3.9

WORKDIR /code

RUN apt update 
RUN apt install ffmpeg -y
# RUN pip install --upgrade pip

RUN pip install git+https://github.com/openai/whisper.git 
RUN pip install setuptools-rust

# RUN pip install fastapi[all] 
# RUN pip install "uvicorn[standard]" gunicorn

# COPY ./requirements.txt /code/requirements.txt

# RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

ENTRYPOINT ["gunicorn", "--bind", "0.0.0.0:9000", "--workers", "1", "--timeout", "0", "app.webservice:app", "-k", "uvicorn.workers.UvicornWorker"]

# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]

# If running behind a proxy like Nginx or Traefik add --proxy-headers
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]

