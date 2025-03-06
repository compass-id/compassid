FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm i --save

COPY . .

CMD ["npm", "start"]