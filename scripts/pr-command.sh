#!/bin/bash
set -ex

SLASH_COMMAND=$1
echo "Running pull request slash command: $SLASH_COMMAND"

cd "$(dirname "$0")"
cd ..

if [ "$SLASH_COMMAND" == "/docs" ]; then
  ./scripts/inspect-docs.sh
elif [ "$SLASH_COMMAND" == "/dist" ]; then
  ./scripts/inspect-dist.sh
else
  echo "Unknown command: $SLASH_COMMAND"
fi
