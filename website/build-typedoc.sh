set -e

cd $(dirname $0)/..
ROOT=$(pwd)

cd $ROOT/packages/prosekit
./node_modules/.bin/typedoc

cd $ROOT/website
rm -rf references 
mv $ROOT/packages/prosekit/.temp/typedoc/prosekit references

# Find the substring "__namedParameters" and throw an error if found
if grep -r "__namedParameters" references; then
  echo 'Found "__namedParameters" in generated markdown files. You probably forgot to add "@param" JSDoc to the function.'
  exit 1
fi
