/* eslint-disable no-console */

module.exports.makeServiceWorkerSuccessLog = ({ count, warnings, size }) => {
  console.log();
  console.log('Service Worker created'.green.underline);

  if (warnings.length) {
    console.log();
    console.log('Warnings'.yellow.underline);
    warnings.forEach((worning) => console.log(`${worning}`.yellow));
  }
  console.log();
  console.log('Precache files info'.green.underline);
  console.log(`Files count: ${count}`.green);
  console.log(`Bytes count: ${parseInt(size / 1024, 10)}kb`.green);
  console.log();
};
