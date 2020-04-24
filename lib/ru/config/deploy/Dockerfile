FROM node:12.13-alpine

ENV REACT_APP_ROUTER_PREFIX /boilerplate

WORKDIR /app

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY integration-tests /app/integration-tests
COPY .babelrc /app/.babelrc
COPY utils /app/utils
COPY config /app/config
COPY public /app/public
COPY cli /app/cli
COPY src /app/src

RUN npx npm-force-resolutions

RUN npm install --only=prod

RUN set CI=true && npx cross-env NODE_ENV=production PUBLIC_URL=/ npx react-app-rewired build

EXPOSE 80

CMD node ./cli/_utils/ci-utils/executor.js --command=start
