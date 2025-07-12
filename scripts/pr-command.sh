set -ex

SLASH_COMMAND=$1
echo "Running pull request slash command: $SLASH_COMMAND"

cd $(dirname $0)/..

if [ "$SLASH_COMMAND" == "/docs" ]; then
  bash scripts/inspect-docs.sh
fi
