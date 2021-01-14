export default {
  name: 'pokemon-page',
  path: '/pokemon-page',
  loadAction: () => import(/* webpackChunkName: 'pokemon-page' */ './index'),
  canParallel: true,
  chunks: ['pokemon-page'],
};
