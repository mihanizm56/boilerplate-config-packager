const path = require('path');

const pathToSource = path.join(process.cwd(), 'src');

// remove sources
const pathToIndex = path.join(pathToSource, 'index.tsx');
const pathToPagesFolder = path.join(pathToSource, 'pages');
const pathToStylesFolder = path.join(pathToSource, 'pages');
const pathToLayoutsFolder = path.join(pathToSource, '_layouts');
const pathToTypesFile = path.join(pathToSource, 'react-app-env.d.ts');
const pathToEnzymeFile = path.join(pathToSource, 'setupEnzyme.ts');
const pathToProxyFile = path.join(pathToSource, 'setupProxy.js');
const pathToUtilsFolder = path.join(pathToSource, '_utils');
const pathToComponents = path.join(pathToSource, '_components');
const pathToTypes = path.join(pathToSource, '_components');

// create sources
const pathToLocalSources = path.join(__dirname, 'sources');

module.exports = {
  removeSources: [
    pathToIndex,
    pathToPagesFolder,
    pathToLayoutsFolder,
    pathToTypesFile,
    pathToEnzymeFile,
    pathToComponents,
    pathToProxyFile,
    pathToTypes,
    pathToStylesFolder,
    pathToUtilsFolder,
  ],
  createSources: [{ from: pathToLocalSources, to: pathToSource }],
};
