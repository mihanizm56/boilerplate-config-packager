#!/bin/bash

bash /etc/deploy/nginx-envs.sh /etc/nginx/nginx.conf

nginx -g 'daemon off;' -c /etc/nginx/nginx.conf