const dotenv = require('dotenv');

dotenv.config();

export const testContractsUrl = process.env.ENDPOINT_CONTRACTS || 'undefined';
export const testRevisesUrl = process.env.ENDPOINT_REVISES || 'undefined';
