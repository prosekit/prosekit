set -e

cd "$(dirname $0)"
WEBSITE_DIR=$(pwd)

cd "$WEBSITE_DIR/.."
ROOT=$(pwd)

# Build the typedoc plugin
cd "$ROOT/packages/typedoc-plugin"
pnpm run build

# Build markdown files
cd "$ROOT/packages/prosekit"
# Ensure that tsc has built all packages and their dependencies
pnpm run build:tsc
# Build the typedoc
pnpm run build:typedoc

# Copy the generated markdown files to the website directory
cd "$WEBSITE_DIR/src/content/docs"
src_dir="$ROOT/packages/prosekit/.temp/typedoc/prosekit/"
dest_dir="$WEBSITE_DIR/src/content/docs/references/"
# Mirror the generated markdown into the docs dir. Prefer rsync: its --checksum
# --no-times avoids churning mtimes, keeping local `pnpm dev` rebuilds fast.
# Some build images (e.g. Vercel) don't ship rsync, so fall back to coreutils:
# removing dest first reproduces rsync's --delete, and the trailing "/." copies
# the directory contents like rsync's "src/".
mkdir -p "$dest_dir"
if command -v rsync >/dev/null 2>&1; then
  # --checksum: compare by content, not size/time
  # --no-times: don't preserve timestamps
  # --delete: remove files in dest that no longer exist in source
  rsync -av --checksum --no-times --delete "$src_dir" "$dest_dir"
else
  echo "rsync not found; falling back to cp"
  rm -rf "$dest_dir"
  mkdir -p "$dest_dir"
  cp -R "$src_dir." "$dest_dir"
fi

# Find the substring "__namedParameters" and throw an error if found
cd "$WEBSITE_DIR/src/content/docs"
if grep -r "__namedParameters" references; then
  echo 'Found "__namedParameters" in generated markdown files. You probably forgot to add "@param" JSDoc to the function.'
  exit 1
fi
