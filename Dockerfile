FROM node:18-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 4001
CMD ["npm", "run", "start:prod"]

