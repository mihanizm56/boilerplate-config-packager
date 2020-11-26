const path = require('path');

const pathToSource = path.join(process.cwd(), 'src');

// remove sources
const pathToIndex = path.join(pathToSource, 'index.tsx');
const pathToPagesFolder = path.join(pathToSource, 'pages');
const pathToLayoutsFolder = path.join(pathToSource, '_layouts');
const pathToTypesFile = path.join(pathToSource, 'react-app-env.d.ts');
const pathToEnzymeFile = path.join(pathToSource, 'setupEnzyme.ts');
const pathToProxyFile = path.join(pathToSource, 'setupProxy.js');

// create sources
const pathToLocalSources = path.join(__dirname, 'sources');

module.exports = {
  removeSources: [
    pathToIndex,
    pathToPagesFolder,
    pathToLayoutsFolder,
    pathToTypesFile,
    pathToEnzymeFile,
    pathToProxyFile,
  ],
  createSources: [{ from: pathToLocalSources, to: pathToSource }],
};
