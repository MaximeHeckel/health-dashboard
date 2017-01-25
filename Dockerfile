FROM alpine:latest

ADD dist ./app/dist
COPY server index.html ./app/
WORKDIR /app
RUN apk --update add ca-certificates && chmod +x server

EXPOSE 8000

ENTRYPOINT ["./server", "-entry=./index.html", "-static=./"]