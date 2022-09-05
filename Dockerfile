FROM node:18-alpine3.15

WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 4000
CMD ["yarn", "start"]