# whisper

## build

```sh
git pull && docker-compose up --build
```

## reference

- https://cloud.google.com/compute/docs/gpus?hl=ko

- https://oomacorp.atlassian.net/wiki/spaces/DEV/pages/317654328/Enable+GPU+acceleration+with+container+services
- https://oomacorp.atlassian.net/wiki/spaces/~61cbb2750586a20069f73371/pages/244057434/Implementing+Whisper+ASR+API

## performance

from 2:50 sec mp3 file

| model    | model size | transcribe |
| -------- | ---------- | ---------- |
| tiny     | 72M        | 5 sec      |
| base     | 140M       | 6 sec      |
| small    | 460M       | 7 sec      |
| medium   | 1.4G       | 13 sec     |
| large-v2 | 2.9G       | 17 sec     |
