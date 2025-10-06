#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."

packages=(
  packages/basic
  packages/core
  packages/extensions
  packages/lit
  packages/pm
  packages/preact
  packages/prosekit
  packages/react
  packages/solid
  packages/svelte
  packages/vue
  packages/web
)

for attempt in 1 2 3 4 5; do
  echo "Attempt ${attempt} to publish packages..."

  ./node_modules/.bin/pkg-pr-new publish --pnpm "${packages[@]}"

  exit_code=$?

  if [ "$exit_code" -eq 0 ]; then
    echo "publish succeeded"
    break
  elif [ "$attempt" -eq 5 ]; then
    echo "publish failed after ${attempt} attempts (exit ${exit_code})" >&2
    exit "$exit_code"
  else
    echo "publish failed (exit ${exit_code}). Retrying in 5s..." >&2
    sleep 5
  fi
done
