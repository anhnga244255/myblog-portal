FROM vothanhkiet/alpine-caddy:0.9.4

WORKDIR /app

COPY ./dist /app

ADD docker /

RUN rm -rf /var/cache/apk/* /root/.npm /root/.node-gyp /tmp/* /var/tmp/*
