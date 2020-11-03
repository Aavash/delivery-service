FROM node:12.17.0-alpine

WORKDIR /usr/src/app
#RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
#COPY ./.certi/ca.crt /usr/local/share/ca-certificates/
#RUN update-ca-certificates
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=true
RUN ls -la
