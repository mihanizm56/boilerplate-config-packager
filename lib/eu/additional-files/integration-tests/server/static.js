// libs
const path = require('path');
const httpServer = require('http');
const dotenv = require('dotenv');
const express = require('express');
const compression = require('compression'); // eslint-disable-line

// get envs
dotenv.config();

const PORT = process.env.TESTCAFE_PORT || 5000;
const PATH_TO_BUILD_DIR = path.join(process.cwd(), 'build');
const PATH_TO_HTML = path.join(PATH_TO_BUILD_DIR, 'index.html');

const app = express();
const server = httpServer.createServer(app);

app.use(compression());

app.use(express.static(PATH_TO_BUILD_DIR));

app.use('*', express.static(PATH_TO_HTML));

// eslint-disable-next-line
server.listen(PORT, () => console.log('server instance started on port', PORT));
