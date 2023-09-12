FROM node:latest

WORKDIR /server/

COPY . /server/

RUN npm install

CMD ["npm", "start"]

EXPOSE 6006