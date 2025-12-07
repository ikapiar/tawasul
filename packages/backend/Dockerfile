FROM docker.io/oven/bun:1.3.2-debian AS build
LABEL authors="sayyidyofa"
WORKDIR /build
COPY . .
RUN bun i && bun run eslint && bun build --compile --minify --sourcemap --bytecode ./src/index.ts --outfile tawasul-app

FROM docker.io/debian:11.11-slim
WORKDIR /app
COPY --from=build /build/tawasul-app ./tawasul-app
EXPOSE 3000
ENTRYPOINT ["./tawasul-app"]