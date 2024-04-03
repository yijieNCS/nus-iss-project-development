FROM node:20.11.0

WORKDIR /app

RUN mkdir backend

WORKDIR backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

WORKDIR src

CMD ["node", "app.js"]