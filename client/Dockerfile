FROM node:alpine AS build-phase
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build

FROM nginx AS run-phase
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-phase /app/build /usr/share/nginx/html