FROM node:20-alpine AS builder

WORKDIR /app

COPY backend/package*.json ./backend/

WORKDIR /app/backend
RUN npm install
RUN npm ci

COPY backend/ ./ 

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/backend/dist ./dist

EXPOSE 3000

ENV DATABASE_URL=postgresql://neondb_owner:npg_ayfrL6PDe0Ik@ep-super-lake-ah9vaa6v.c-3.us-east-1.aws.neon.tech/eclinic?sslmode=require&channel_binding=require

CMD ["node", "dist/main"]
