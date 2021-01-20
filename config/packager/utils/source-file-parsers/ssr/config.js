const path = require('path');

const pathToSource = path.join(process.cwd(), 'src');

// remove sources
const pathToIndex = path.join(pathToSource, 'index.tsx');
const pathToReduxFolder = path.join(pathToSource, '_redux');
const pathToPagesFolder = path.join(pathToSource, 'pages');
const pathToLayoutsFolder = path.join(pathToSource, '_layouts');
const pathToTypesFolder = path.join(pathToSource, '_types');
const pathToComponentsFolder = path.join(pathToSource, '_components');
const pathToUtilsFolder = path.join(pathToSource, '_utils');
const pathToConstantsFolder = path.join(pathToSource, '_constants');
const pathToStylesFolder = path.join(pathToSource, 'styles');
const pathToPublicFolder = path.join(pathToSource, 'public');
const pathToApiFolder = path.join(pathToSource, 'api');
const pathToDTSFile = path.join(pathToSource, 'react-app-env.d.ts');
const pathToEnzymeFolder = path.join(pathToSource, 'setupEnzyme.ts');
const pathToProxyFolder = path.join(pathToSource, 'setupProxy.js');

// create sources
const pathToLocalSources = path.join(__dirname, 'sources');
const pathToStorybookConfig = path.join(__dirname, 'storybook-config');

module.exports = {
  removeSources: [
    pathToIndex,
    pathToPagesFolder,
    pathToReduxFolder,
    pathToLayoutsFolder,
    pathToComponentsFolder,
    pathToApiFolder,
    pathToConstantsFolder,
    pathToTypesFolder,
    pathToUtilsFolder,
    pathToStylesFolder,
    pathToDTSFile,
    pathToEnzymeFolder,
    pathToProxyFolder,
    pathToPublicFolder,
  ],
  createSources: [
    { from: pathToLocalSources, to: pathToSource },
    {
      from: pathToStorybookConfig,
      to: process.cwd(),
    },
  ],
};
