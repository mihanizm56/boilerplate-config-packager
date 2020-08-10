FROM fholzer/nginx-brotli

# set process working directory
WORKDIR /usr/share/metadata/core

# copy build artefacts
COPY build /usr/share/metadata/core/build

# nginx configs
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/nginx.conf
COPY config/deploy/nginx.conf /etc/nginx/nginx.conf

# copy test certs
COPY config/test-certs /certs

# open port
EXPOSE 443
