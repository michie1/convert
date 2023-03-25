FROM node:18.15.0
COPY . /convert
WORKDIR /convert
RUN yarn install
CMD yarn start
