
FROM node:18-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 18

CMD ["nginx", "-g", "daemon off;"]
