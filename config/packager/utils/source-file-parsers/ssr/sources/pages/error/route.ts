export default {
  name: 'error',
  path: '/error',
  loadAction: () => import(/* webpackChunkName: 'error' */ './index'),
  canParallel: true,
  chunks: ['error'],
};
