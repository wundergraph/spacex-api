FROM node:16.17-alpine3.15 as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

FROM node:16.17-alpine3.15

WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN yarn install

COPY build /app/build
RUN sed -i "s/http:\/\/localhost:4000/https:\/\/spacex-api.fly.dev/g" /app/build/index.html
COPY --from=build /app/dist /app/dist

EXPOSE 4000
CMD ["yarn", "start"]
