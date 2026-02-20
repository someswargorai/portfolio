FROM node:latest

WORKDIR /app

COPY package*.json /app/

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]