# Stage 1
FROM node:14-alpine as node
WORKDIR /app
COPY . .
RUN npm install && npm run build 

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/my-app /usr/share/nginx/html