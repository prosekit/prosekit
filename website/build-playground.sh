set -ex 

cd $(dirname $0)

mkdir -p public/astrobook

rm -rf public/astrobook

cp -r ../playground/dist public/astrobook
