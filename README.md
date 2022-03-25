# Simple password manager

This repository is part of an assignment for bachelor's thesis.

## Description
The project demonstrates an implementation of password manager
in [electron](https://www.electronjs.org) and [reactjs](https://reactjs.org).

This repository contains server side of the password manager.

## Related projects
Client application is accessible on: [github.com/hader00/password-manager-dev](https://github.com/hader00/password-manager-dev)

Chromium based browser extension is accessible on: [github.com/hader00/password-manager-extension-dev](https://github.com/hader00/password-manager-extension-dev)


## Local installation

### Required dependencies
[docker](https://www.docker.com)

### How to build and start locally
1. Clone the repository,
2. Install required dependencies,
3. Observe the default ports in **.env** file, change ports if needed
4. Run `docker-compose up`
5. The server should be running on: [http://localhost:6868](http://localhost:6868), or on other port if modified

### Available Scripts
Start and build docker project: `docker-compose up`
Rebuild docker project: `docker-compose up --build`
Stop the running image: `docker-compose down`
Stop and remove all containers and images of the project: `docker-compose down --rmi all`