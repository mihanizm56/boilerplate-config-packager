#!/bin/bash

REACT_APP_ROUTER_PREFIX=$1

if [ ! "$1" -o "$1" == 'undefined' ];
then
  echo -en "\n\033[40;1;41m Error - not correct env for default route \033[0m\n"
  echo -en "\033[40;1;41m REACT_APP_ROUTER_PREFIX $REACT_APP_ROUTER_PREFIX \033[0m\n"
    exit 2
fi

cat << _EOF_ > ./config/deploy/Dockerfile
FROM node:12.13-alpine

ENV REACT_APP_ROUTER_PREFIX ${REACT_APP_ROUTER_PREFIX}
ENV PUBLIC_URL /
ENV NODE_ENV production

WORKDIR /app

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY utils /app/utils
COPY config /app/config
COPY public /app/public
COPY cli /app/cli
COPY src /app/src
COPY build /app/build
COPY node_modules /app/node_modules

EXPOSE 80

CMD node config/deploy/make-runtime-config.js && node config/production-server/static.js
_EOF_


echo -en "\n \e[40;1;42m Dockerfile is created \e[m\n"
