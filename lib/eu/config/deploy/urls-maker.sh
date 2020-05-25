#!/bin/bash

# get all process envs from system (docker)
ENVS=$(printenv)

# get all process envs from system (local)
# ENVS=$(cat .env)

URLS=$(cat config/deploy/urls-declaration.txt)

result_string=''

for env_line in $ENVS
    do
        env_array=(`echo $env_line | sed 's/=/\n/g'`)
        env_name=${env_array[0]}
        env_value=${env_array[1]}

        for url_line in $URLS
            do
                url_array=(`echo $url_line | sed 's/=/\n/g'`)
                url_name=${url_array[0]}

                if [ $url_name == $env_name ];
                then
                    if [ "$result_string" == '' ];
                        then
                            result_string="window.${env_name}='${env_value}';"
                        else
                            result_string="$result_string"window."${env_name}='${env_value}';"
                    fi
                fi
            done
    done

echo $result_string > "build/url-config.js"
