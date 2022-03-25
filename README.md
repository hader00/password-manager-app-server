# Simple password manager

This repository is part of an assignment for bachelor's thesis.

## Description
The project demonstrates an implementation of password manager
in [electron](https://www.electronjs.org) and [reactjs](https://reactjs.org).

This repository contains server side of the password manager.

## Other parts
Client application is accessible on: [github.com/hader00/password-manager-dev](https://github.com/hader00/password-manager-dev)

Chromium based browser extension is accessible on: [github.com/hader00/password-manager-extension-dev](https://github.com/hader00/password-manager-extension-dev)


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