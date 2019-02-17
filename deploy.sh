mkdir dist

cp -rf error dist/error
cp -rf home dist/home
cp -rf static dist/static
cp app.js dist/app.js
cp package.json dist/package.json

rsync -avzP --delete ./dist/* root@yijic.com:~/web/

rm -rf dist
