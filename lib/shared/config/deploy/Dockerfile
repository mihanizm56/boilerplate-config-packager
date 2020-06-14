
FROM node:12.13-alpine as builder

RUN apk add --update bash

WORKDIR /app

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY public /app/public
COPY tsconfig.json /app/tsconfig.json
COPY config /app/config
COPY utils /app/utils
COPY cli /app/cli
COPY src /app/src

RUN npx npm-force-resolutions
RUN npm install --only-prod
RUN node ./cli/_utils/ci-utils/executor.js --command=build
RUN node ./cli/_utils/ci-utils/executor.js --command=compress-build

# prepare nginx config with pushed files
RUN chmod +x /app/config/deploy/nginx-maker.sh
RUN ["bash","/app/config/deploy/nginx-maker.sh", "/usr/share/metadata/core/build", "config/nginx/nginx.conf", "build"]

FROM fholzer/nginx-brotli

RUN apk add --update bash

# !!!!! FOR LOCAL TEST ONLY
# COPY config/test-certs /certs
# ENV CLUSTER test

WORKDIR /usr/share/metadata/core

# nginx configs
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/nginx.conf
COPY --from=builder /app/config/nginx/nginx.conf /etc/nginx/nginx.conf

# deploy configs
COPY --from=builder /app/build /usr/share/metadata/core/build
COPY --from=builder /app/config/deploy/nginx-envs.sh /etc/deploy/nginx-envs.sh
COPY --from=builder /app/config/deploy/start.sh /etc/deploy/start.sh

EXPOSE 443

RUN chmod +x /etc/deploy/start.sh

CMD [ "bash","/etc/deploy/start.sh" ]