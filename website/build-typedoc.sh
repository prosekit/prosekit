set -e

cd $(dirname $0)

mkdir -p temp/typedoc
rm -rf temp/typedoc

mkdir -p references
rm -rf references

./node_modules/.bin/typedoc

mv temp/typedoc/prosekit references
rm -rf temp/typedoc

touch references/index.md
rm references/index.md

# Find the substring "__namedParameters" and throw an error if found
if grep -r "__namedParameters" references; then
  echo 'Found "__namedParameters" in generated markdown files. You probably forgot to add "@param" JSDoc to the function.'
  exit 1
fi
