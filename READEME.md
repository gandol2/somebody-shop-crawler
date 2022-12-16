```
npm init -y
npm install typescript ts-node @types/node --save-dev

npx tsc --init

npm install prisma --save-dev

npx prisma init --datasource-provider mysql
```

## crontab

```
# vi /etc/cron.d/baruda

# cron jobs
* * * * *      root    /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 3; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 6; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 9; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 12; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 15; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 18; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 21; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 24; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 27; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 30; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 33; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 36; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 39; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 42; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 45; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 48; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 51; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 54; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log
* * * * *      root    sleep 57; /root/.nvm/versions/node/v14.21.2/bin/node ~/somebody-shop-crawler/dist/src/index.js >> /tmp/baruda.log


# Timmer
* * * * *      root    echo `date` >> /tmp/baruda.log
* * * * *      root    sleep 10; echo `date` >> /tmp/baruda.log
* * * * *      root    sleep 20; echo `date` >> /tmp/baruda.log
* * * * *      root    sleep 30; echo `date` >> /tmp/baruda.log
* * * * *      root    sleep 40; echo `date` >> /tmp/baruda.log
* * * * *      root    sleep 50; echo `date` >> /tmp/baruda.log


```

## grc

```

# grc -c ~/.grc/conf.tail tail -f /tmp/baruda.log

```
