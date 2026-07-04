# =========================
# 1. Base image
# =========================
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci


# =========================
# 2. Build stage
# =========================
FROM base AS build

WORKDIR /app

COPY . .

# Build backend + frontend
RUN npm run build:api
RUN npm run build:ui


# =========================
# 3. Production dependencies only
# =========================
FROM node:20-alpine AS prod-deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev


# =========================
# 4. Runtime image
# =========================
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

# Copy production node modules
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built backend
COPY --from=build /app/api-service/build ./api-service/build

# Copy frontend build (if served by backend or static)
COPY --from=build /app/ui-service ./ui-service

# Copy package.json (needed for node resolution/scripts clarity)
COPY package*.json ./

EXPOSE 3000

# Start API (primary server)
CMD ["node", "api-service/build/server.js"]