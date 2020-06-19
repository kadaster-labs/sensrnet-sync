#!/bin/bash

export FABRIC_DIR=./fabric
export BRIDGE_DIR=./bridge
export VERBOSE=

function shout() {
  echo -e "${COLOR}${*}${NC}"
}

# Print the usage message
function printHelp() {
  echo "Usage: "
  echo "  sync.sh <Mode> [Flags]"
  echo "    <Mode>"
  echo "      - 'up' - bring up all sync components (bridge + fabric peers)"
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

#  fabricUp
#  prepareBridgeForFabricNetwork
  bridgeUp

  exit 0
}

function syncDown() {
  shout "Bringing down all sync components ..."
  echo
  bridgeDown
  cleanUpBridgeForFabricNetwork
  fabricDown

  exit 0
}

function fabricUp() {
  shout "Starting HyperLedger Fabric in ${FABRIC_DIR}"
  echo

  pushd $FABRIC_DIR/test-network
  ./network.sh up createChannel -ca -s couchdb $VERBOSE
  ./network.sh deployCC -l typescript $VERBOSE
  popd

  if [ $? -ne 0 ]; then
    echo "ERROR !!! Starting HyperLedger Fabric"
    exit 1
  fi
}

function fabricDown() {
  shout "Stopping HyperLedger Fabric ..."
  echo

  pushd $FABRIC_DIR/test-network
  ./network.sh down
  popd
}

function prepareBridgeForFabricNetwork() {
  shout "Copying generated Fabric config to bridge ..."
  echo
  echo "Using 'Org1': ${PEER_ORG_CONFIG_FILE}"
  cp $PEER_ORG_CONFIG_FILE $BRIDGE_PEER_CONFIG_FILE
  echo

  pushd $BRIDGE_DIR
  echo "Generating admin"
  echo
  node src/enrollAdmin.js
  echo
  echo "Generating user"
  node src/registerUser.js
  popd

  if [ $? -ne 0 ]; then
    echo "ERROR !!! Preparing Sync Bridge"
    exit 1
  fi
}

function cleanUpBridgeForFabricNetwork() {
  shout "Cleaning up Sync Bridge ..."
  echo
  rm -R $BRIDGE_DIR/wallet
  rm "${BRIDGE_PEER_CONFIG_FILE}"
}

function bridgeUp() {
  shout "Starting Sync Bridge in ${FABRIC_DIR}"
  echo

  pushd $BRIDGE_DIR
  docker-compose build
  docker-compose up
#  docker-compose -p backend up
  popd

  if [ $? -ne 0 ]; then
    echo "ERROR !!! Starting Sync Bridge"
    exit 1
  fi
}

function bridgeDown() {
  shout "Stopping Sync Bridge ..."
  echo

  pushd $BRIDGE_DIR
  docker-compose down
  popd
}


# Properties

PEER_ORG_CONFIG_FILE=$FABRIC_DIR/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json
BRIDGE_PEER_CONFIG_FILE=$BRIDGE_DIR/connection-org1.json

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
