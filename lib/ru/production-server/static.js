// libs
const path = require('path');
const httpServer = require('http');
const dotenv = require('dotenv');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
// const logger = require('morgan');

// get envs
dotenv.config();

// internal libs
const { limiter } = require('./_utils/limiter');
const { startServer } = require('./_utils/start-server');
const { customMiddlewareHeaders } = require('./_utils/custom-headers');
const { notFoundLogger } = require('./_utils/errors-logger');

const PORT = process.env.SERVER_PORT;
const PATH_TO_BUILD_DIR = path.join(__dirname, '..', 'build');
const PATH_TO_HTML = path.join(PATH_TO_BUILD_DIR, 'index.html');

const app = express();
const server = httpServer.createServer(app);

// app.use(logger('common'));
app.use(limiter);
app.use(compression());
app.use(helmet());
app.use(customMiddlewareHeaders);

app.use(express.static(PATH_TO_BUILD_DIR));

app.use('*', express.static(PATH_TO_HTML));

app.use(notFoundLogger);

startServer({ port: PORT, server });
