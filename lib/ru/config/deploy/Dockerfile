FROM node:12.13-alpine

ENV REACT_APP_ROUTER_PREFIX /boilerplate
ENV SERVER_PORT 80
ENV IP_LIMIT 1000

WORKDIR /app

COPY ./package-lock.json /app/package-lock.json
COPY ./package.json /app/package.json
COPY ./server/static.js /app/server/static.js
COPY ./server/_utils/limiter.js /app/server/_utils/limiter.js
COPY ./server/_utils/start-server.js /app/server/_utils/start-server.js
COPY ./server/_utils/custom-headers.js /app/server/_utils/custom-headers.js
COPY ./server/_utils/errors-logger.js /app/server/_utils/errors-logger.js
COPY ./public /app/public
COPY ./.babelrc /app/.babelrc
COPY ./config-overrides.js /app/config-overrides.js
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.paths.json /app/tsconfig.paths.json
COPY ./_utils /app/_utils
COPY ./config /app/config
COPY ./src /app/src

RUN npx npm-force-resolutions

RUN npm install --only=prod

RUN set CI=true && npx cross-env NODE_ENV=production PUBLIC_URL=/ npx react-app-rewired build

EXPOSE 80

CMD node ./cli/_utils/ci-utils/executor.js --command=start
