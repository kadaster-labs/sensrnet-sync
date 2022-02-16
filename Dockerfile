
# First Stage: to install and build dependences
FROM node:16.5.0 AS builder

WORKDIR /app

COPY ./package*.json ./
COPY patches patches
RUN npm ci --unsafe-perm

COPY tsconfig*.json ./
COPY src src

RUN npm run build && \
    npm prune --production


# Second Stage: use lightweight alpine image and run as non-root
FROM node:16.13.2-alpine3.15

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

COPY --chown=node:node VERSION .
COPY --chown=node:node entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

USER node

EXPOSE 3500

ENTRYPOINT ["/home/node/app/entrypoint.sh"]
CMD ["run"]
