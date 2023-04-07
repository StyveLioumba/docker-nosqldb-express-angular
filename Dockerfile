FROM node:alpine
# Create app directory
WORKDIR /usr/src/app
COPY ./api/package.json ./
RUN npm install
COPY ./api/. .
CMD ["npm","run","start:dev"]