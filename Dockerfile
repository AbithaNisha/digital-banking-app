FROM node:21
WORKDIR /app
# Inga '*' potta thaan express module image-kulla varum
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
