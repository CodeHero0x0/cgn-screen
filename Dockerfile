FROM node:22-slim AS builder

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:stable-alpine


COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 1081

CMD ["nginx", "-g", "daemon off;"]

