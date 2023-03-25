FROM node:18.15.0
RUN apt-get update && apt-get install -y dcraw
COPY . /convert
WORKDIR /convert
RUN yarn install
CMD yarn start
