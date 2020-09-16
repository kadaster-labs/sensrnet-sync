FROM node:12 AS builder

LABEL maintainer="Wim Florijn <wim.florijn@kadaster.nl>"

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY src src
COPY tsconfig*.json ./

RUN npm run build && \
    npm prune --production


FROM node:12-slim

WORKDIR /app

ADD VERSION .

COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3500

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["run"]
