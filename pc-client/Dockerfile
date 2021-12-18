FROM node:16

WORKDIR /usr/src/app


COPY package.json ./
RUN yarn global add cross-env

RUN yarn install
COPY . .
RUN yarn run build
RUN yarn global add serve

CMD [ "serve", "-s" ,"build"]