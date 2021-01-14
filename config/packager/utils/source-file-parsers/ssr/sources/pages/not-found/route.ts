import { constants } from 'router5';

export default {
  name: constants.UNKNOWN_ROUTE,
  path: '/not-found',
  loadAction: () => import(/* webpackChunkName: 'not-found' */ './index'),
  canParallel: true,
  chunks: ['not-found'],
  translations: ['not-found'],
};
