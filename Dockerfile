FROM node:lts-alpine

RUN apk --no-cache add curl docker

WORKDIR /usr/src/app/server
COPY server/package.json .
COPY server/yarn.lock .
RUN yarn install --prod

WORKDIR /usr/src/app
COPY server server
COPY dashboard dashboard

# dashboard
RUN cd dashboard && yarn install --prod && yarn build && cp -r build ../server/public

WORKDIR /usr/src/app/server
EXPOSE 3001
ENV BASIC_AUTH ""
CMD [ "node", "index.js" ]