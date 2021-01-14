/* eslint-disable func-names */

export const brotliMiddleware = (app) => {
  app.get('*.js', function (req, res, next) {
    req.url += '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'text/javascript; charset=utf-8');
    res.set('charset', 'utf-8');
    next();
  });
  app.get('*.css', function (req, res, next) {
    req.url += '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'text/css; charset=utf-8');
    next();
  });
};
