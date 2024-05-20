FROM node:16-alpine3.11
 
RUN apk add bash

WORKDIR /app
COPY ./ /app
 
RUN npm install

# CMD ["npm", "run", "dev"]

# wait-for-it.sh
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh