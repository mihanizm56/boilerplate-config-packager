export default {
  name: 'page1',
  path: '/page1',
  loadAction: () => import(/* webpackChunkName: 'page1' */ './index'),
  canParallel: true,
  chunks: ['page1'],
  i18n: {
    namespaces: ['page-1'],
  },
};
