FROM node:14-alpine3.10

RUN mkdir /home/node/app && chown -R node:node /home/node/app
RUN mkdir /home/node/web && chown -R node:node /home/node/web

COPY --chown=node:node src/web/package*.json /home/node/web/
COPY --chown=node:node src/api/package*.json /home/node/app/

USER node

WORKDIR /home/node/app
RUN npm install && npm cache clean --force --loglevel=error
COPY --chown=node:node src/api/.env* ./

WORKDIR /home/node/web
RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node src/api /home/node/app/
COPY --chown=node:node src/web /home/node/web/

RUN npm run build:docker

EXPOSE 3000

WORKDIR /home/node/app

ENV NODE_ENV=production
RUN npm run build:api
CMD [ "node", "./dist/index.js" ]