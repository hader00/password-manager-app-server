FROM node:16

WORKDIR /password-manager-database-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
