#!/bin/bash
set -ex

REF_DIR="website/src/content/docs/references"

cd "$(dirname "$0")/.."
DEV_DIR=$(pwd)

# Install pnpm
npm install -g corepack@latest
pnpm --version

# Check out the master branch
cd /tmp
mkdir -p prosekit-docs-temp
cd prosekit-docs-temp
git clone https://github.com/prosekit/prosekit.git
cd prosekit
pnpm install
MASTER_DIR=$(pwd)

# Build the docs from the master branch
cd "$MASTER_DIR/website"
pnpm run build:typedoc

# Copy the master docs
cd "$DEV_DIR"
mkdir -p "$REF_DIR"
rm -rf "$REF_DIR"
cp -r "$MASTER_DIR/$REF_DIR" "$REF_DIR"

# Commit the master docs
cd "$DEV_DIR"
git add --force "$REF_DIR"
git commit --allow-empty -m "chore: inspect docs (steps 1/3)"

# Build the docs from the dev branch
cd "$DEV_DIR/website"
pnpm install
pnpm run build:typedoc

# Commit the dev docs
cd "$DEV_DIR"
git add --force "$REF_DIR"
git commit --allow-empty -m "chore: inspect docs (steps 2/3)"

# Remove the docs
cd "$DEV_DIR"
mkdir -p "$REF_DIR"
rm -rf "$REF_DIR"

# Commit the changes
git add --all
git commit --allow-empty -m "chore: inspect docs (steps 3/3)"

# Push the changes
git push
