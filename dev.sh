#!/usr/bin/bash 
docker-compose down --remove-orphans

yarn install

docker pull brkntyldrm/nest:latest 

docker-compose up -d 

sleep 2

docker-compose logs -f


