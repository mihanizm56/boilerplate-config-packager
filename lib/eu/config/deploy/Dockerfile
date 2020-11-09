FROM fholzer/nginx-brotli

# add bash
RUN apk add --update bash

# set process working directory
WORKDIR /usr/share/metadata/core

# nginx configs
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/nginx.conf
COPY config/deploy/nginx.conf /etc/nginx/nginx.conf

# copy test certs
COPY config/test-certs /certs

#copy configs
COPY config/deploy /usr/share/metadata/core/config/deploy

# set roots to files
RUN chmod +x /usr/share/metadata/core/config/deploy/runtime-envs/production/make-runtime-config.sh

# copy build artefacts
COPY build /usr/share/metadata/core/build

# open port
EXPOSE 443

CMD [ "bash","/usr/share/metadata/core/config/deploy/start.sh" ]