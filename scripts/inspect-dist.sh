#!/bin/bash
set -ex

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
  local label="$2"

  cd "$dir"
  rm -rf packages/*/dist || true
  pnpm install
  pnpm run build:package

  # Remove source maps
  find packages/*/dist -name "*.map" -delete 2>/dev/null || true

  # Clear index so deletions are captured
  git rm -r --cached 'packages/*/dist/' 2>/dev/null || true

  # Commit each file type separately for clearer diffs
  git add --force 'packages/*/dist/**/*.d.ts' || true
  git add --force 'packages/*/dist/*.d.ts' || true
  git commit --allow-empty -m "chore: ${label} .d.ts"

  git add --force 'packages/*/dist/**/*.js' || true
  git add --force 'packages/*/dist/*.js' || true
  git commit --allow-empty -m "chore: ${label} .js"

  git add --force 'packages/*/dist/**/*.css' || true
  git add --force 'packages/*/dist/*.css' || true
  git commit --allow-empty -m "chore: ${label} .css"

  git add --force 'packages/*/dist/' || true
  git commit --allow-empty -m "chore: ${label} other"
}

# Build and commit master dist in worktree
BEFORE_BUILD=$(git -C "$MASTER_DIR" rev-parse HEAD)
build_and_commit "$MASTER_DIR" "[master]"
AFTER_BUILD=$(git -C "$MASTER_DIR" rev-parse HEAD)

# Cherry-pick master dist commits into dev branch
cd "$DEV_DIR"
git cherry-pick --allow-empty "${BEFORE_BUILD}..${AFTER_BUILD}"

# Remove worktree
git worktree remove "$MASTER_DIR" --force

# Build and commit dev dist
build_and_commit "$DEV_DIR" "[dev]"

# Clean up dist directories
rm -rf packages/*/dist || true
git add --all
git commit --allow-empty -m "chore: clean up dist"

# Push
git push
