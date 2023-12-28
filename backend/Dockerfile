FROM node:20-alpine3.17

WORKDIR /appa
COPY ./node_modules/ ./node_modules
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./nest-cli.json ./

# Cuando se termine el proyecto se ejecuta esto
#RUN npm install --omit=dev
