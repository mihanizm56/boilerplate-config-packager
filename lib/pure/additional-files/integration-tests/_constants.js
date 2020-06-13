const dotenv = require('dotenv');

dotenv.config();

const TESTCAFE_PORT = process.env.TESTCAFE_PORT || 5000;

export const pageUrl = `http://127.0.0.1:${TESTCAFE_PORT}`;
