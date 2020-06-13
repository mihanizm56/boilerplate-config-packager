#!/bin/bash

# PATH_TO_BUILD=$3
# PATH_TO_TEMP='./temp.txt'
# PATH_TO_CONF=$2
# PATH_TO_DIR=$1

PATH_TO_BUILD='build'
PATH_TO_TEMP='./temp.txt'
PATH_TO_CONF='./config/nginx/nginx.conf'
PATH_TO_DIR='/usr/share/metadata/core/build'

rm -fr $PATH_TO_TEMP
rm -fr $PATH_TO_CONF
touch $PATH_TO_TEMP
touch $PATH_TO_CONF

mkdir -p '/app/test'
touch 'test.txt'

# IFS=' '
FILES_LIST=$(find $PATH_TO_BUILD -maxdepth 20 -type f -not -path '*/\.*' | sort)

for FILE_PATH in ${FILES_LIST[@]};
do
    if [[ $FILE_PATH != *".html"* ]] && [[ $FILE_PATH != *".map"* ]] && [[ $FILE_PATH != *".txt"* ]] && [[ $FILE_PATH != *".woff2"* ]] && [[ $FILE_PATH != *".gz"* ]] && [[ $FILE_PATH != *".br"* ]];
    then
        NGINX_REPLACEMENT="${FILE_PATH/build/'\t\t\thttp2_push '}"';'
        echo -e $NGINX_REPLACEMENT >> $PATH_TO_TEMP
    fi
done

IFS=' '
FULL_PUSH_LIST=$(cat $PATH_TO_TEMP)

cat << _EOF_ > $PATH_TO_CONF
user nginx;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	include /etc/nginx/mime.types;
	default_type application/octet-stream;
	
	brotli off;
	gzip off;
	brotli_static on;
	gzip_static on;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	server {
		#
		# SSL configuration
		#
		listen 443 ssl http2;

		ssl_certificate     /certs/server.crt;
		ssl_certificate_key /certs/server.key;

		http2_max_concurrent_pushes 1000;
		http2_max_requests 1000;

		server_name _;

		root ${PATH_TO_DIR};

		resolver 10.15.12.100 10.15.12.200 ipv6=off;

		location ~ \.(js|map|jpg|json|svg|ico|png|css|woff|woff2|ttf)$ {
			access_log off;

			root ${PATH_TO_DIR};
		}

		location / {
			access_log off;
			expires 1s;
			add_header Cache-Control "no-cache, no-store, must-revalidate, max-age=0";
			add_header Pragma "no-cache";

${FULL_PUSH_LIST}

			try_files \$uri /index.html;
		}

		location /manager/api/v1/ {
			set \$target http://manager-nginx.{{NAMESPACE_PASSPORT}}.svc.k8s.{{KLUSTER}};
			proxy_pass \$target;

			proxy_redirect     off;
		}

		location /i18n/ {
			set \$target http://i18n.suppliers-portal-eu.svc.k8s.test;
			proxy_pass \$target;

			proxy_redirect     off;
		}
	}
}
_EOF_

rm -fr $PATH_TO_TEMP
