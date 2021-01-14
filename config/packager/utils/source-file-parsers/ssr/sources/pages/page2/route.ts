export default {
  name: 'page2',
  path: '/page2',
  loadAction: () => import(/* webpackChunkName: 'page2' */ './index'),
  canParallel: true,
  chunks: ['page2'],
  i18n: {
    namespaces: ['page-2'],
  },
};
