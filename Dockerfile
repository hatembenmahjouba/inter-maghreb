FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./

COPY frontend/package*.json frontend/
RUN npm run install-client

RUN npm install --only=production

COPY frontend/ frontend/
RUN npm run build --prefix frontend

COPY backend/ backend/
COPY uploads/ uploads/

USER node

CMD [ "npm", "start"]

EXPOSE 5000