FROM node:20

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ /app

EXPOSE 5555

CMD ["npm", "run", "dev"]
