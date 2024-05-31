set -ex 

cd $(dirname $0)

mkdir -p public/_
rm -rf public/_

cp -r ../_ public/_
