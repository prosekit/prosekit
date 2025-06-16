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
rm -rf references 
cp -r "$ROOT/packages/prosekit/.temp/typedoc/prosekit" references

# Find the substring "__namedParameters" and throw an error if found
cd "$WEBSITE_DIR/src/content/docs"
if grep -r "__namedParameters" references; then
  echo 'Found "__namedParameters" in generated markdown files. You probably forgot to add "@param" JSDoc to the function.'
  exit 1
fi

# Copy all files in references/ to docs/references/
cd "$WEBSITE_DIR/src/content"
mkdir -p docs/references
rsync -av references/* docs/references/
