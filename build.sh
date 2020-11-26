#!/bin/bash

set -ex

REGISTRY=sensrnetregistry.azurecr.io
USERNAME=sensrnet
# image name
IMAGE=sync-bridge

docker build -t $REGISTRY/$USERNAME/$IMAGE:latest .
