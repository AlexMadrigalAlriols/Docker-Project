FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
ENV WDS_SOCKET_PORT=0
RUN npm i
CMD ["npm", "run", "start"]