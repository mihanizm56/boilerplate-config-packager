const path = require('path');

const pathToSource = path.join(process.cwd(), 'src');

// remove sources
const pathToIndex = path.join(pathToSource, 'index.tsx');
const pathToPagesFolder = path.join(pathToSource, '_redux');

// create sources
const pathToLocalSources = path.join(__dirname, 'sources');

module.exports = {
  removeSources: [pathToIndex, pathToPagesFolder],
  createSources: [{ from: pathToLocalSources, to: pathToSource }],
};
