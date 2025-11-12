FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY tsconfig*.json nest-cli.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV DATABASE_URL=postgresql://neondb_owner:npg_ayfrL6PDe0Ik@ep-super-lake-ah9vaa6v.c-3.us-east-1.aws.neon.tech/eclinic?sslmode=require&channel_binding=require

CMD ["node", "dist/main"]
