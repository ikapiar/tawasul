FROM oven/bun:latest AS build
ARG BACKEND_BASE_URL=http://localhost:3000
WORKDIR /build
COPY . .
ENV VITE_API_BASE_URL=BACKEND_BASE_URL
RUN bun i && bun run build

FROM docker.io/library/nginx:1.29.4-alpine3.23-perl
COPY --from=build /build/dist /usr/share/nginx/html
EXPOSE 80