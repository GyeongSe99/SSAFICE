#!/bin/sh
set -e

envsubst '${SERVER_NAME} ${BACKEND_HOST} ${BACKEND_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"