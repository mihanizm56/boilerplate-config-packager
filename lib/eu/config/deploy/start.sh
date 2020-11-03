#!/bin/bash

bash /usr/share/metadata/core/config/deploy/make-runtime-config.sh

nginx -g 'daemon off;' -c /etc/nginx/nginx.conf