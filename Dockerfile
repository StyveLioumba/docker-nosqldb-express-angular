# Stage 1
FROM node:alpine as node
WORKDIR /app
COPY ./myapp/. .
RUN npm install && npm run build 

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/my-app /usr/share/nginx/html

# Stage 3
FROM node:alpine as api
WORKDIR /usr/src/app
COPY ./api/package.json ./
RUN npm install
COPY ./api/. .
CMD ["npm","run","start:dev"]