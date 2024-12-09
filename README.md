# Command to run the project in development mode

docker-compose -f docker-compose.dev.yml up -d

## To see logs :

docker-compose -f docker-compose.dev.yml logs backend
docker-compose -f docker-compose.dev.yml logs frontend
