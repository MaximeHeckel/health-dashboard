FROM golang:latest as serverbuilder

ADD ./go /go/src/github.com/MaximeHeckel/healthDashboard/go/
WORKDIR /go/src/github.com/MaximeHeckel/healthDashboard/go/src/server
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags '-s' -a -installsuffix cgo -v -o server

###################################

FROM node:7.4-alpine as appbuilder

RUN apk --update add git bash curl tar \
  && rm -rf /var/cache/apk/* \
  && touch ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.22.0
ENV NPM_CONFIG_LOGLEVEL=warn \
    PATH=/root/.yarn/bin:${PATH}

ADD . ./app
WORKDIR /app
RUN yarn install --ignore-engines
ENV NODE_ENV=production
RUN yarn build

##################################

FROM alpine:latest

COPY --from=serverbuilder /go/src/github.com/MaximeHeckel/healthDashboard/go/src/server/server ./app/
COPY --from=appbuilder /app/build/index.html ./app/
COPY --from=appbuilder /app/build/manifest.json ./app/
COPY --from=appbuilder /app/build/asset-manifest.json ./app/
COPY --from=appbuilder /app/build/static/js/* ./app/static/js/
COPY --from=appbuilder /app/build/static/css/* ./app/static/css/
WORKDIR /app
RUN apk --update add ca-certificates && chmod +x server

EXPOSE 8000
ENTRYPOINT ["./server", "-static=./"]