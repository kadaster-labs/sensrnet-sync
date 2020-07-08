#!/bin/bash

function shout() {
  echo -e "${COLOR}${*}${NC}"
}

# Print the usage message
function printHelp() {
  echo "Usage: "
  echo "  sync.sh <Mode> [Flags]"
  echo "    <Mode>"
  echo "      - 'up' - bring up all sync components (bridge)"
  echo "      - 'down' - bring down all sync components and clean up"
  echo "      - 'restart' - restart the all sync components"
  echo
  echo "    Flags:"
  echo "    -verbose - verbose mode"
  echo "  sync.sh -h (print this message)"
  echo
  echo " Possible Mode and flags"
  echo "  sync.sh up"
  echo "  sync.sh down"
  echo
  echo " Taking all defaults:"
  echo "	sync.sh up"
  echo
  echo " Examples:"
  echo "  sync.sh up"
  echo "  sync.sh down"

  exit 0
}

function syncUp() {
  shout "Bringing up all sync components ..."
  echo

  bridgeUp

  exit 0
}

function syncDown() {
  shout "Bringing down all sync components ..."
  echo
  bridgeDown

  exit 0
}

function bridgeUp() {
  shout "Starting Sync Bridge in ${FABRIC_DIR}"
  echo

  pushd $BRIDGE_DIR
  docker-compose build
  docker-compose up -d 2>&1
  popd

  docker ps -a

  if [ $? -ne 0 ]; then
    echo "ERROR !!! Starting Sync Bridge"
    exit 1
  fi
}

function bridgeDown() {
  shout "Stopping Sync Bridge ..."
  echo

  pushd $BRIDGE_DIR
  docker-compose down --volumes --remove-orphans
  clearContainers
  removeUnwantedImages
  popd
}

# Obtain CONTAINER_IDS and remove them
# This function is called when you bring a network down
function clearContainers() {
  CONTAINER_IDS=$(docker ps -a | awk '($2 ~ /sync.*/) {print $1}')
  if [ -z "$CONTAINER_IDS" -o "$CONTAINER_IDS" == " " ]; then
    echo "---- No containers available for deletion ----"
  else
    docker rm -f $CONTAINER_IDS
  fi
}

# Delete any images that were generated as a part of this setup
# specifically the following images are often left behind:
# This function is called when you bring the network down
function removeUnwantedImages() {
  DOCKER_IMAGE_IDS=$(docker images | awk '($1 ~ /sync.*/) {print $3}')
  if [ -z "$DOCKER_IMAGE_IDS" -o "$DOCKER_IMAGE_IDS" == " " ]; then
    echo "---- No images available for deletion ----"
  else
    docker rmi -f $DOCKER_IMAGE_IDS
  fi
}


# colors
COLOR='\033[0;36m'
NC='\033[0m' # No Color


###############################################################################
# Parse commandline args

## Parse mode
if [[ $# -lt 1 ]] ; then
  printHelp
  exit 0
else
  MODE=$1
  shift
fi

# parse flags

while [[ $# -ge 1 ]] ; do
  key="$1"
  case $key in
  -h )
    printHelp
    exit 0
    ;;
  -verbose )
    VERBOSE="-verbose"
    shift
    ;;
  * )
    echo
    echo "Unknown flag: $key"
    echo
    printHelp
    exit 1
    ;;
  esac
  shift
done

# Determine mode of operation and printing out what we asked for
if [ "$MODE" == "up" ]; then
  echo "Starting all sync components using ${FABRIC_DIR} and ${BRIDGE_DIR} folders"
  echo
elif [ "$MODE" == "down" ]; then
  echo "Stopping all sync components"
  echo
elif [ "$MODE" == "restart" ]; then
  echo "Restarting all sync components"
  echo
else
  printHelp
  exit 1
fi

if [ "${MODE}" == "up" ]; then
  syncUp
elif [ "${MODE}" == "down" ]; then
  syncDown
elif [ "${MODE}" == "restart" ]; then
  syncDown
  syncUp
else
  printHelp
  exit 1
fi
