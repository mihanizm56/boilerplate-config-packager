/* eslint-disable no-console */

import 'core-js';
import 'regenerator-runtime/runtime';
import path from 'path';
import dotenv from 'dotenv';
// import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import { setServerEnvs as setServerGlobalEnvs } from './_utils/collect-envs/set-server-envs';
import { setupProxy } from './proxy';
import { ssr, errors } from './middlewares';
import { initProcessListeners } from './_utils/init-process-listeners';

initProcessListeners();

export const isProduction = process.env.NODE_ENV === 'production';
const DEFAULT_PORT_VALUE = '3000';

if (isProduction) {
  dotenv.config();
} else {
  dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

setServerGlobalEnvs();

if (!env.PORT) {
  env.PORT = DEFAULT_PORT_VALUE;
}

const app = express();

// if (isProduction) {
//   app.use(helmet());
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (!isProduction) {
  setupProxy(app);
}

// юзаем просто раздачу статики в режиме разработки
// в продакшене юзаем nginx
if (!isProduction) {
  app.use(
    '/static',
    express.static(path.resolve(__dirname, 'public'), {
      maxAge: '1ms',
    }),
  );
}

app.use((req, res, next) => {
  app.set('etag', false);
  res.set('Cache-Control', 'no-store');
  next();
});

// Обработка запросов ssr
app.get('*', ssr());

// Обработка ошибок при ssr
app.use(errors);

// Запуск сервера
if (!module.hot) {
  app.listen(env.PORT, () => {
    console.info(`The server is running at port ${env.PORT}`);
  });
}

// Автоматический перезапуск сервера при изменениях в файлах
// В режиме Hot Module Replacement
if (module.hot) {
  (app as any).hot = module.hot;
  module.hot.decline();
}

export default app;
