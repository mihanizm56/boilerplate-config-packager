const onHeaders = require('on-headers');

module.exports.customMiddlewareHeaders = (req, res, next) => {
  onHeaders(res, function removeEtag() {
    this.removeHeader('ETag');
  });

  res.set('Cache-Control', 'private, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '-1');

  next();
};
