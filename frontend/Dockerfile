# stage 1
FROM node:16 as builder

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app

WORKDIR /app
COPY . .
# RUN npm install
RUN npm run build:production

FROM nginx:alpine
COPY --from=builder /app/dist/whisper-frontend/ /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
