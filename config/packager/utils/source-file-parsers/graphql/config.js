const path = require('path');

const pathToSource = path.join(process.cwd(), 'src');

// remove sources
const pathToIndex = path.join(pathToSource, 'index.tsx');
const pathToReduxFolder = path.join(pathToSource, '_redux');
const pathToPagesFolder = path.join(pathToSource, 'pages');
const pathToLayoutsFolder = path.join(pathToSource, '_layouts');
const pathToComponentsFolder = path.join(pathToSource, '_components');
const pathToApiFolder = path.join(pathToSource, 'api');

// create sources
const pathToLocalSources = path.join(__dirname, 'sources');

module.exports = {
  removeSources: [
    pathToIndex,
    pathToPagesFolder,
    pathToReduxFolder,
    pathToLayoutsFolder,
    pathToComponentsFolder,
    pathToApiFolder,
  ],
  createSources: [{ from: pathToLocalSources, to: pathToSource }],
};
