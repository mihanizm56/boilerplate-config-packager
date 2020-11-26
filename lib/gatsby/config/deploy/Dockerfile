FROM git.wildberries.ru:4567/suppliers-portal-eu/devops/nginx-brotli:1.16.1

# add bash
RUN apk add --update bash


ENV CENTRAL_PASSPORT "/ns/passport/passport"
ENV AUTH_URL "/passport/api/v2/auth"

# nginx configs
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/nginx.conf
COPY config/deploy/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/metadata/core

# !!!!! FOR LOCAL TEST ONLY
# COPY config/test-certs /certs

COPY build /usr/share/metadata/core/build
COPY config /usr/share/metadata/core/config

EXPOSE 80

CMD [ "bash","/usr/share/metadata/core/config/deploy/start.sh" ]