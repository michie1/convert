FROM node:18.15.0
COPY . /convert
WORKDIR /src
RUN yarn install
CMD yarn start
