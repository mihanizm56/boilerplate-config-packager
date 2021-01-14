import home from './home/route';
import page1 from './page1/route';
import page2 from './page2/route';
import notFound from './not-found/route';
import testPage from './pokemon-page/route';

const routes = [home, page1, page2, notFound, testPage];

if (__DEV__) {
  // eslint-disable-next-line global-require
  const error = require('./error/route').default;
  routes.push(error);
}

export default routes;
