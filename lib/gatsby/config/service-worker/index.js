// eslint-disable-next-line
const colors = require('colors');
const workboxBuild = require('workbox-build');
const { makeServiceWorkerSuccessLog } = require('./loggers');

// NOTE: This should be run *AFTER* all your assets are built
module.exports.createServiceWorker = async () => {
  // This will return a Promise
  const { count, size, warnings } = await workboxBuild.generateSW({
    globDirectory: 'build',
    mode: 'development',
    cacheId: 'suppliers-passport',
    // This one will be fulfilled after build
    globIgnores: ['**/runtime-config.js'],
    cleanupOutdatedCaches: true,
    sourcemap: false,
    // Precache files config
    globPatterns: ['**/*.{woff,woff2,html,js,css}'],
    runtimeCaching: [
      {
        // This one will be fulfilled after build and we must keep it as new as possible
        urlPattern: /runtime-config\.js$/,
        handler: 'NetworkFirst',
      },
      {
        // Use cacheFirst because if new build will be done - new ServiceWorker will be created
        urlPattern: /^https?:.*\.(js|css|png|jpg|jpeg|webp|svg|gif|tiff|woff|woff2)$/,
        handler: 'CacheFirst',
      },
      {
        // Use cacheFirst because if new build will be done - new ServiceWorker will be created
        urlPattern: /^https?:.*\.(js|css)$/,
        handler: 'NetworkOnly',
      },
      {
        // Use NetworkFirst because if there is no hash prefix on manifest .json files
        urlPattern: /^https?:.*\.(json)$/,
        handler: 'NetworkFirst',
      },
    ],
    skipWaiting: true,
    clientsClaim: true,
    swDest: 'build/sw.js',
  });

  makeServiceWorkerSuccessLog({ count, size, warnings });
};
