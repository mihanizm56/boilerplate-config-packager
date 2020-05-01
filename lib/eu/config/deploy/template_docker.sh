#!/bin/bash

cat << _EOF_ > ./config/deploy/Dockerfile
FROM node:12.13.0-alpine as builder

RUN mkdir -p /app

WORKDIR /app

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY utils /app/utils
COPY config /app/config
COPY cli /app/cli
COPY src /app/src

RUN npm install --only=prod

RUN node /app/cli/_utils/ci-utils/executor.js --command=build

FROM nginx

# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# users are not allowed to listen on priviliged ports
ADD config/nginx/nginx-server.conf /etc/nginx/conf.d/nginx-server.conf
RUN rm -rf /etc/nginx/conf.d/default.conf; sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 80

COPY --from=builder /app/build /usr/share/metadata/core

WORKDIR /usr/share/metadata/core
_EOF_


echo -en "\n \e[40;1;42m Dcokerfile is created \e[m\n"
