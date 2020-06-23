#!/bin/bash
set -e

if [ "$1" = "run" ]; then
  node src/initIdentity.js
  npm start
else
  exec "$@"
fi
