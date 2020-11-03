#!/bin/bash

bash /usr/share/metadata/core/config/deploy/runtime-envs/make-runtime-config.sh

nginx -g 'daemon off;' -c /etc/nginx/nginx.conf