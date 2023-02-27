FROM node:18-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./

EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]

