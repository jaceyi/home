mkdir dist

cp -f index.html dist/index.html
cp -f favicon.ico dist/favicon.ico
cp -rf style dist/style
cp -rf error dist/error
cp -rf static dist/static

scp -r ./dist/* root@yijic.com:/data/web

rm -rf dist
