FROM alpine:latest AS compile

RUN apk update && apk add npm nodejs
RUN npm install -g yarn
WORKDIR /src
COPY ./package*.json /app/
RUN npm install
COPY . /app/
RUN yarn build

FROM nginx:alpine
COPY --from=compile /src/build/ /public/
WORKDIR /public
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx"]
