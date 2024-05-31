set -ex 

cd $(dirname $0)

mkdir -p public/_
rm -rf public/_

cp -r ../playground/dist public/_
