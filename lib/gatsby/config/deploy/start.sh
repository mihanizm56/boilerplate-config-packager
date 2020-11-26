#!/bin/bash
bash config/deploy/runtime-envs/make-runtime-config.sh

nginx -g 'daemon off;' -c /etc/nginx/nginx.conf