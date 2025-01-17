# A temporary script to copy the website to the website2 directory

cd $(dirname $0)

rm -rf website2/src/examples
rm -rf website2/src/shared
rm -rf website2/src/stories

cp -lR playground/src/examples website2/src/examples
cp -lR playground/src/shared website2/src/shared
cp -lR playground/src/stories website2/src/stories
