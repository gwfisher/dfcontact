FROM node:slim

EXPOSE 3000

CMD "mkdir /data"
WORKDIR /data

COPY index.js /data
COPY package.json /data

RUN apt-get update
RUN apt-get -y install npm
RUN npm install

ENTRYPOINT ["node","index.js"]