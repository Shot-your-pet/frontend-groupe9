#!/usr/bin/env sh

set -e

BUILD_DIR="/usr/share/nginx/html"

if [ -n "$API_URL" ]; then
  echo "Remplacement du placeholder pour API_URL par $API_URL"
  find $BUILD_DIR -type f -exec sed -i "s|VITE_API_URL|${API_URL}|g" {} \;
fi
if [ -n "$KEYCLOAK_URL" ]; then
  echo "Remplacement du placeholder pour KEYCLOAK_URL par $KEYCLOAK_URL"
  find $BUILD_DIR -type f -exec sed -i "s|VITE_KEYCLOAK_URL|${KEYCLOAK_URL}|g" {} \;
fi
if [ -n "$KEYCLOAK_REALM" ]; then
  echo "Remplacement du placeholder pour KEYCLOAK_REALM par $KEYCLOAK_REALM"
  find $BUILD_DIR -type f -exec sed -i "s|VITE_KEYCLOAK_REALM|${KEYCLOAK_REALM}|g" {} \;
fi
if [ -n "$KEYCLOAK_CLIENT_ID" ]; then
  echo "Remplacement du placeholder pour KEYCLOAK_CLIENT_ID par $KEYCLOAK_CLIENT_ID"
  find $BUILD_DIR -type f -exec sed -i "s|VITE_KEYCLOAK_CLIENT_ID|${KEYCLOAK_CLIENT_ID}|g" {} \;
fi
if [ -n "$VAPID_PUBLIC_KEY" ]; then
  echo "Remplacement du placeholder pour VAPID_PUBLIC_KEY par $VAPID_PUBLIC_KEY"
  find $BUILD_DIR -type f -exec sed -i "s|VITE_VAPID_PUBLIC_KEY|${VAPID_PUBLIC_KEY}|g" {} \;
fi

exec "$@"
