FROM node:18-alpine AS builder
WORKDIR /app
COPY /*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./

EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]

