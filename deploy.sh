yarn build

scp -r ./dist/* root@152.32.172.101:/data/web

rm -r ./dist/
