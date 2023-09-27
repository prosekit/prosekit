set -ex 

cd $(dirname $0)

mkdir -p temp/typedoc
rm -rf temp/typedoc

mkdir -p references
rm -rf references

./node_modules/.bin/typedoc

mv temp/typedoc/prosekit references
rm -rf temp/typedoc
