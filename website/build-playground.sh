set -ex 

cd $(dirname $0)

mkdir -p public/playground/dist
rm -rf public/playground/dist

cp -r ../playground/dist public/playground/dist
