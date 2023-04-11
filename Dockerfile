FROM node:lts-alpine
RUN apk add --no-cache bash
RUN npm config set cache /tmp --global
WORKDIR /opt/app
USER node
