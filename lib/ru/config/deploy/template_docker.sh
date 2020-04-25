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

COPY ./package-lock.json /app/package-lock.json
COPY ./package.json /app/package.json
COPY ./server/static.js /app/server/static.js
COPY ./server/_utils/limiter.js /app/server/_utils/limiter.js
COPY ./server/_utils/start-server.js /app/server/_utils/start-server.js
COPY ./server/_utils/custom-headers.js /app/server/_utils/custom-headers.js
COPY ./server/_utils/errors-logger.js /app/server/_utils/errors-logger.js
COPY ./public /app/public
COPY ./.babelrc /app/.babelrc
COPY ./config-overrides.js /app/config-overrides.js
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.paths.json /app/tsconfig.paths.json
COPY ./_utils /app/_utils
COPY ./config /app/config
COPY ./src /app/src

RUN npx npm-force-resolutions

RUN npm install --only=prod

RUN set CI=true && npx react-app-rewired build

EXPOSE 80

CMD node config/deploy/make-runtime-config.js && node config/production-server/static.js
_EOF_


echo -en "\n \e[40;1;42m Dcokerfile is created \e[m\n"
