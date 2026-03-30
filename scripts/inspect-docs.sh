#!/bin/bash
set -ex

REF_DIR="website/src/content/docs/references"

cd "$(dirname "$0")/.."
DEV_DIR=$(pwd)

# Disable turborepo cache to ensure fresh builds
export TURBO_FORCE=true

# Create a worktree for master
TEMP_BRANCH="temp-$(uuidgen)"
MASTER_DIR=/tmp/$TEMP_BRANCH
git worktree add -b "$TEMP_BRANCH" "$MASTER_DIR" origin/master

build_and_commit() {
  local dir="$1"
  local message="$2"

  cd "$dir"
  rm -rf "$REF_DIR" || true
  pnpm install
  pnpm -C website run build:typedoc

  # Clear index so deletions are captured
  git rm -r --cached "$REF_DIR" 2>/dev/null || true
  git add --force "$REF_DIR"
  git commit --allow-empty -m "$message"
}

# Build and commit master docs in worktree
BEFORE_BUILD=$(git -C "$MASTER_DIR" rev-parse HEAD)
build_and_commit "$MASTER_DIR" "chore: [1/3] build master docs"
AFTER_BUILD=$(git -C "$MASTER_DIR" rev-parse HEAD)

# Cherry-pick master docs commit into dev branch
cd "$DEV_DIR"
git cherry-pick --allow-empty "${BEFORE_BUILD}..${AFTER_BUILD}"

# Remove worktree
git worktree remove "$MASTER_DIR" --force

# Build and commit dev docs
build_and_commit "$DEV_DIR" "chore: [2/3] build dev docs"

# Clean up docs
rm -rf "$REF_DIR" || true
git add --all
git commit --allow-empty -m "chore: [3/3] clean up docs"

# Push
git push
