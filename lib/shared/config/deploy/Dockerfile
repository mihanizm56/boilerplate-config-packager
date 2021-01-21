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
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf

# deploy configs
COPY build /usr/share/metadata/core/build
COPY config/deploy/nginx-envs.sh /etc/deploy/nginx-envs.sh
COPY config/deploy/start.sh /etc/deploy/start.sh

EXPOSE 443

RUN chmod +x /etc/deploy/start.sh

CMD [ "bash","/etc/deploy/start.sh" ]
