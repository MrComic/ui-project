FROM node:20-alpine3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build  --configuration=production

FROM nginx:1.27.4-alpine

COPY --from=builder /app/dist/ui-core-test/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
