cd $(dirname "$0")
pwd 
cd registry
pwd 
export PATH=$PATH:$PWD/node_modules/.bin
which tailwindcss

tailwindcss -i ./src/tailwind.css -o ./tailwind.output.css 
