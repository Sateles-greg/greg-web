# Dockerfile para backend de compartilhamento de tela
FROM node:20-alpine
WORKDIR /app
COPY server.js ./
RUN npm install express socket.io dotenv
EXPOSE 3000
CMD ["node", "server.js"]
