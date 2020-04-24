const rateLimit = require('express-rate-limit');

const IP_LIMIT = process.env.IP_LIMIT;
const DELTA_TIME = 1000;

module.exports.limiter = rateLimit({
  windowMs: DELTA_TIME,
  max: IP_LIMIT, // limit each IP requests per DELTA_TIME
});
