#!/bin/bash
ENV_DEV=$(cat .env)
ENV_PROD=$(cat .env_production)
rm .env
echo "$ENV_PROD" > .env
tar czf code.tar.gz src/ public/ package-lock.json package.json .env
rm .env
echo "$ENV_DEV" > .env
scp code.tar.gz desap@10.30.4.61:~/apps
rm code.tar.gz
ssh desap@10.30.4.61 << 'ENDSSH'
pm2 stop desap
cd apps
rm -R desap
mkdir desap
tar xf code.tar.gz -C desap
rm code.tar.gz
cd desap
npm install --production
pm2 start desap
ENDSSH