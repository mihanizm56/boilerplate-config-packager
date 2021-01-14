export default {
  name: 'home',
  path: '/',
  loadAction: () => import(/* webpackChunkName: 'home' */ './index'),
  canParallel: true,
  chunks: ['home'],
  translations: ['home'],
  showLayoutScrollTop: true,
};
