# Stage 1
FROM node:alpine as node
WORKDIR /app
COPY ./myapp/. .
RUN npm install && npm run build 

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/my-app /usr/share/nginx/html