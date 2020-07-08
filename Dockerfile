FROM node:12

WORKDIR /app

COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

COPY package*.json ./

RUN npm install

COPY src src
COPY tsconfig.json tsconfig.json

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["run"]
