FROM python:3.10

WORKDIR /code

RUN apt update 
RUN apt install ffmpeg -y
RUN pip install --upgrade pip

COPY ./requirements.txt /code/requirements.txt

RUN pip install -r /code/requirements.txt

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "80"]

# If running behind a proxy like Nginx or Traefik add --proxy-headers
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]

