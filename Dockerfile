FROM node:16-alpine as build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/picture_list /usr/share/nginx/html

