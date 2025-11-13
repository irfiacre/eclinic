# -------------------------------
# 1. FRONTEND BUILD STAGE
# -------------------------------
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy and install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build


# -------------------------------
# 2. BACKEND BUILD STAGE
# -------------------------------
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build

# -------------------------------
# 3. FINAL RUNTIME STAGE
# -------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend ./backend

# Copy frontend (built version)
COPY --from=frontend-builder /app/frontend ./frontend

# Install concurrently to run both servers
RUN npm install -g concurrently

# Start both frontend & backend
CMD concurrently \
  "cd backend && npm run start:prod" \
  "cd frontend && npm start"
