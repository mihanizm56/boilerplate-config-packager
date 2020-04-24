const dotenv = require('dotenv');

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

export const pageUrl = `http://127.0.0.1:${SERVER_PORT}`;
