# --- Stage 1: Build Frontend ---
FROM oven/bun:latest AS frontend-builder
WORKDIR /app
COPY . .
RUN bun install
WORKDIR /app/packages/frontend
# Build frontend with relative API path
ENV VITE_API_BASE_URL="" 
RUN bun run build

# --- Stage 2: Build Backend ---
FROM oven/bun:latest AS backend-builder
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

# Set environment variables
ENV FRONTEND_BASE_URL=""
EXPOSE 3000
ENTRYPOINT ["./tawasul-app"]
