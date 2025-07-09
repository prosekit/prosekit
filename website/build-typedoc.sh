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
mkdir -p "$dest_dir"
# -a: archive mode (preserve permissions, timestamps, etc.)
# -v: verbose output
# --checksum: use checksums instead of file size/time for comparison
# --no-times: don't preserve timestamps
# --delete: remove files in dest that don't exist in source
rsync -av --checksum --no-times --delete "$src_dir" "$dest_dir"

# Find the substring "__namedParameters" and throw an error if found
cd "$WEBSITE_DIR/src/content/docs"
if grep -r "__namedParameters" references; then
  echo 'Found "__namedParameters" in generated markdown files. You probably forgot to add "@param" JSDoc to the function.'
  exit 1
fi
