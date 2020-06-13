const { pageUrl } = require('../_constants');

const AUTH_URL = 'manager/api/v1/auth';

module.exports.LOGIN_BY_PHONE_ENDPOINT = `${pageUrl}/${AUTH_URL}/login_by_phone`;
module.exports.LOGIN_ENDPOINT = `${pageUrl}/${AUTH_URL}/login`;
module.exports.GRANT_ENDPOINT = `${pageUrl}/${AUTH_URL}/grant`;
