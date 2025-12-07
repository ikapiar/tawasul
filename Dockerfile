FROM docker.io/ubuntu:24.04
LABEL authors="sayyidyofa"
WORKDIR /app
COPY tawasul-app .
COPY assets ./assets
RUN chmod +x tawasul-app
EXPOSE 3000
ENTRYPOINT ["./tawasul-app"]