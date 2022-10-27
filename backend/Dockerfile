#Use node, for obvious reasons
FROM node:18-slim
#Change to /app in container
WORKDIR /app
#Copy package json to install dependicies
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD [ "node", "server.js" ]