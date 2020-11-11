#!/bin/bash

rm -fr build/umd/runtime-config.js

source config/deploy/runtime-envs/development/local-window-endpoints.env

ALL_ENVS=$(awk "END { for (name in ENVIRON) { print name; }}" < /dev/null)

RESULT_STRING=""

oldIFS="$IFS"
IFS='' FILTERED_ENVS=($(<config/deploy/runtime-envs/frontend-envs.sh))
IFS="$oldIFS"

for ENV_NAME in $ALL_ENVS
do
    for FILTERED_ENV_NAME in $FILTERED_ENVS
    do
        if [[ $FILTERED_ENV_NAME == $ENV_NAME ]]
            then
                ENV_VALUE=$(eval echo "\$$ENV_NAME")
                RESULT_STRING+="window.$FILTERED_ENV_NAME=\"$ENV_VALUE\";"
            fi  
    
    done
done

echo $RESULT_STRING >> 'build/umd/runtime-config.js'