#!/bin/bash

PATH_TO_NGINX=$1
KLUSTER=$(printenv CLUSTER)

sed -i -- "s/{{KLUSTER}}/$KLUSTER/g" $PATH_TO_NGINX