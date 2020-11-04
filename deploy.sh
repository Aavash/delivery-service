ENV=prod docker-compose up -d --build
ENV=prod docker-compose -f docker-compose.database.yml up -d
docker exec -it delivery-service npm run typeorm migration:run