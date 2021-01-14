FROM node:12.13-alpine

COPY . .

RUN npm install pm2 -g

EXPOSE 80

CMD ["pm2-runtime", "--json", "config/deploy/pm2.json"]