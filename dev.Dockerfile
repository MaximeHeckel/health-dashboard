FROM node:7.4

RUN apt-get clean && \
    apt-get update && \
    apt-get install -yq \
      curl \
      git && \
    apt-get clean

WORKDIR /app

RUN mkdir -p /goroot && \
  curl https://storage.googleapis.com/golang/go1.7.linux-amd64.tar.gz | tar xzf - -C /goroot --strip-components=1

COPY . .

ENV GOROOT=/goroot \
    GOPATH=/go \
    PATH=/goroot/bin:/go/bin/:$PATH \
    NODE_ENV=development

COPY ./go $GOPATH/src/github.com/MaximeHeckel/health-dashboard/go/
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.22.0

ENV NPM_CONFIG_LOGLEVEL=warn \
    PATH=/root/.yarn/bin:${PATH}

RUN yarn install --ignore-engines

EXPOSE 8000
EXPOSE 3000

CMD ["yarn", "start"]