FROM node:16-alpine as build

WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine as deploy
WORKDIR /app
ENV NODE_ENV production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/static /app/static
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 4000

CMD ["node", "dist/index.js"]
