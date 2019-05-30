mkdir dist

cp -rf index.html dist/index.html
cp -rf style dist/style
cp -rf error dist/error
cp -rf static dist/static

scp -r ./dist/* root@152.32.172.101:/data/web

rm -rf dist
