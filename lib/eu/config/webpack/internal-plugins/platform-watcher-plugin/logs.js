// eslint-disable-next-line
const colors = require('colors');
const ip = require('ip');
const { dockerPort } = require('./commands');

const ipAddress = ip.address();

/* eslint-disable no-console */
module.exports.getLoadingLog = () => {
  console.clear();
  console.log('');
  console.log('Starting the development server...'.blue);
};

module.exports.getFinishedLog = () => {
  console.clear();
  console.log('Compiled successfully!'.green);
  console.log('');
  console.log('You can now view your project in the browser.');
  console.log('');
  console.log(
    `  Local:            https://localhost:${dockerPort}/config.json`,
  );
  console.log(
    `  On Your Network:  https://${ipAddress}:${dockerPort}/config.json`,
  );
  console.log('');
  console.log('Note that the development build is optimized.');
  console.log(`To create a production build, use${' npm run build'.blue}.`);
  console.log('');
};

module.exports.getCrashedLog = error => {
  console.log('Compiled with errors!'.red.underline);
  console.log('');
  console.log('Error:'.red.underline);
  console.log('');
  console.log(error);
};
/* eslint-enable no-console */
