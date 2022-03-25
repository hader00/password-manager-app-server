# Docker Compose 
## Prerequisites
Docker needs to be installed, visit: [www.docker.com](https://www.docker.com)

## Run
```bash
docker-compose up
```

## Rebuild
```bash
docker-compose up --build
```

## Stop the System
```bash
docker-compose down
```

## To remove all containers and images:
```bash
docker-compose down --rmi all
```

## API
After start the password manager api will be accessible on:
http://localhost:$NODE_DOCKER_PORT

Default $NODE_DOCKER_PORT is 6868