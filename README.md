# Command to run the project in development mode

docker-compose -f docker-compose.dev.yml up -d

## To see backend logs:

docker-compose -f docker-compose.dev.yml logs backend

## To see frontend logs:

docker-compose -f docker-compose.dev.yml logs frontend
