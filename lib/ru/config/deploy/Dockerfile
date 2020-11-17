FROM node:12.13-alpine
# FROM git.wildberries.ru:4567/suppliers-portal-eu/devops/node:12.13-alpine

ENV REACT_APP_ROUTER_PREFIX /mutual-settlements
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
