mkdir dist

mkdir dist/admin
cp -rf admin/dist dist/admin/dist
cp -rf src dist/src
cp -rf error dist/error
mkdir dist/files
cp -rf home dist/home
cp -rf public dist/public
cp config.ts dist/config.ts
cp index.ts dist/index.ts
cp package.json dist/package.json
cp tsconfig.json dist/tsconfig.json

rsync -avzP --delete ./dist/* root@155.138.202.192:~/web/

rm -rf dist
