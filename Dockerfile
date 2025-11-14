FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=backend-builder /app/backend ./backend

COPY --from=frontend-builder /app/frontend ./frontend

RUN npm install -g concurrently

CMD concurrently \
  "cd frontend && npm start" \
  "cd backend && npm run start:prod"
