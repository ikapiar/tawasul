# --- Stage 1: Build Frontend ---
FROM oven/bun:latest AS frontend-builder
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN bun install
WORKDIR /app/packages/frontend
# Build frontend
RUN bun run build

# --- Stage 2: Build Backend ---
FROM oven/bun:latest AS backend-builder
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN bun install
WORKDIR /app/packages/backend
RUN bun run build

# --- Stage 3: Final Image ---
FROM docker.io/debian:11.11-slim
WORKDIR /app
# Copy the compiled Bun binary
COPY --from=backend-builder /app/packages/backend/tawasul-app .
# Copy the frontend static assets into the 'public' folder
COPY --from=frontend-builder /app/packages/frontend/dist ./public
ENV NODE_ENV=production

EXPOSE 3000
ENTRYPOINT ["./tawasul-app"]
