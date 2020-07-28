#!/bin/bash

cat << _EOF_ > ./config/deploy/Dockerfile
FROM node:12.13-alpine as builder

RUN apk add --update bash

WORKDIR /app

ENV REACT_APP_ROUTER_PREFIX /

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY utils /app/utils
COPY config /app/config
COPY cli /app/cli
COPY src /app/src
COPY build /app/build

# prepare nginx config with pushed files
RUN chmod +x /app/config/deploy/nginx-maker.sh
RUN ["bash","/app/config/deploy/nginx-maker.sh", "/usr/share/metadata/core/build", "config/nginx/nginx.conf", "build"]

FROM fholzer/nginx-brotli

RUN apk add --update bash

# !!!!! FOR LOCAL TEST ONLY
COPY config/test-certs /certs
# ENV CLUSTER test

WORKDIR /usr/share/metadata/core

# nginx configs
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/nginx.conf
COPY --from=builder /app/config/nginx/nginx.conf /etc/nginx/nginx.conf

# deploy configs
COPY build /usr/share/metadata/core/build
COPY config/deploy/start.sh /etc/deploy/start.sh

EXPOSE 443

RUN chmod +x /etc/deploy/start.sh

CMD [ "bash","/etc/deploy/start.sh" ]
_EOF_


echo -en "\n \e[40;1;42m Dockerfile is created \e[m\n"
