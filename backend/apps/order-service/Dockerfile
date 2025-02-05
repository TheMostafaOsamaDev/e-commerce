FROM node:22

WORKDIR /app/backend/order-service

COPY package*.json ./

RUN npm install

COPY . .

RUN ["npm", "run", "start:dev"]

