set -e

cd "$(dirname $0)"
WEBSITE_DIR=$(pwd)

cd "$WEBSITE_DIR/.."
ROOT=$(pwd)

cd "$ROOT/packages/typedoc-plugin"
pnpm run build

cd "$ROOT/packages/prosekit"
# Ensure that tsc has built all packages and their dependencies
pnpm run build:tsc
# Build the typedoc
pnpm run build:typedoc

cd "$WEBSITE_DIR"
cd src/content/docs

rm -rf references 
cp -r "$ROOT/packages/prosekit/.temp/typedoc/prosekit" references

# Find the substring "__namedParameters" and throw an error if found
cd "$WEBSITE_DIR/src/content/docs"
if grep -r "__namedParameters" references; then
  echo 'Found "__namedParameters" in generated markdown files. You probably forgot to add "@param" JSDoc to the function.'
  exit 1
fi

cd "$WEBSITE_DIR/src/content/docs"
find references -name "*.md" | while read file; do
  # If the file only contains one line, remove this file.
  if [ $(cat "$file" | egrep '\S+' | wc -l) -le 1 ]; then
    echo "Removing $file because it only contains one line"
    rm "$file"
    continue
  fi
done

# Copy all files in references/ to docs/references/
cd "$WEBSITE_DIR/src/content"
mkdir -p docs/references
rsync -av references/* docs/references/
