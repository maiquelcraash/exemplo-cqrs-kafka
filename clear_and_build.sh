#!/bin/bash

docker-compose rm -s -f
docker-compose build
docker-compose up -d

echo ===================================================
echo Aguarde: configurando o kafka...
sleep 5s
echo Aguarde: configurando producer...
sleep 5s
echo Aguarde: configurando consumer...
sleep 5s
echo PRONTO!

open http://192.168.99.100/
                             
                             