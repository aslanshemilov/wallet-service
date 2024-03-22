FROM node:18

WORKDIR /wallet-service
COPY package.json .
RUN npm install
RUN npm run build
COPY . . 
CMD npm run start