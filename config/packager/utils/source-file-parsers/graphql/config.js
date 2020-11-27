const path = require('path');

const pathToSource = path.join(process.cwd(), 'src');

// remove sources
const pathToIndex = path.join(pathToSource, 'index.tsx');
const pathToReduxFolder = path.join(pathToSource, '_redux');
const pathToPagesFolder = path.join(pathToSource, 'pages');
const pathToLayoutsFolder = path.join(pathToSource, '_layouts');
const pathToComponentsFolder = path.join(pathToSource, '_components');

// create sources
const pathToLocalSources = path.join(__dirname, 'sources');

module.exports = {
  removeSources: [
    pathToIndex,
    pathToPagesFolder,
    pathToReduxFolder,
    pathToLayoutsFolder,
    pathToComponentsFolder,
  ],
  createSources: [{ from: pathToLocalSources, to: pathToSource }],
};
