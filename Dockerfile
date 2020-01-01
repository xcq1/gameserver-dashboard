FROM node:lts-alpine

WORKDIR /usr/src/app/server
COPY server/package.json .
COPY server/yarn.lock .
RUN yarn install --prod

WORKDIR /usr/src/app
COPY server .
COPY dashboard .

# dashboard
RUN cd dashboard && yarn install --prod && yarn build && cp build/static ../server/public

WORKDIR /usr/src/app/server
EXPOSE 3001
CMD [ "node", "index.js" ]