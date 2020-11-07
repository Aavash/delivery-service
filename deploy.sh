#!/bin/sh
set -e

ENV=prod ENV=dev docker-compose -f docker-compose.minio.yml up -d
ENV=prod docker-compose -f docker-compose.database.yml up -d

ENV=prod docker-compose up -d --build
docker exec -it delivery-service npm run typeorm migration:run