FROM node:18-alpine

RUN set -x \
    && apk add --no-cache --virtual .build-deps \
    postgresql-dev \
    curl-dev \
    && apk add --no-cache \
    curl \
    postgresql-client \
    && apk del -f .build-deps

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER root

