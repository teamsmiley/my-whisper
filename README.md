# whisper

## build

```sh
git pull && docker-compose up --build
```

## reference

- https://cloud.google.com/compute/docs/gpus?hl=ko

## performance

from 2:50 sec mp3 file

| model    | model size | transcribe |
| -------- | ---------- | ---------- |
| tiny     | 72M        | 5 sec      |
| base     | 140M       | 6 sec      |
| small    | 460M       | 7 sec      |
| medium   | 1.4G       | 13 sec     |
| large-v2 | 2.9G       | 17 sec     |

1080ti에서 테스트 햇습니다.

## docs

<https://teamsmiley.gitbook.io/devops/ai/whisper>
