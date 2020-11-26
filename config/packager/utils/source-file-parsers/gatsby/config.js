const path = require('path');

const pathToSource = path.join(process.cwd(), 'src');

// remove sources
const pathToIndex = path.join(pathToSource, 'index.tsx');
const pathToPagesFolder = path.join(pathToSource, 'pages');
const pathToLayoutsFolder = path.join(pathToSource, '_layouts');
const pathToUtilsFolder = path.join(process.cwd(), 'utils');

// create sources
const pathToLocalIndex = path.join(__dirname, 'sources', 'index.tsx');
const pathToLocalPages = path.join(__dirname, 'sources', '_pages');
const pathToLocalGatsbyPages = path.join(__dirname, 'sources', 'pages');
const pathToLocalI18n = path.join(__dirname, 'sources', 'i18n');
const pathToLocalStatic = path.join(__dirname, 'sources', 'static');
const pathToLocalLayouts = path.join(__dirname, 'sources', '_layouts');
const pathToLocalHtml = path.join(__dirname, 'sources', 'html.js');
const pathTLocalUtilsFolder = path.join(__dirname, 'sources', 'utils');

module.exports = {
  removeSources: [
    pathToIndex,
    pathToPagesFolder,
    pathToLayoutsFolder,
    pathToUtilsFolder,
  ],
  createSources: [
    { from: pathToLocalIndex, to: path.join(pathToSource, 'index.tsx') },
    { from: pathToLocalPages, to: path.join(pathToSource, '_pages') },
    { from: pathToLocalGatsbyPages, to: path.join(pathToSource, 'pages') },
    { from: pathToLocalI18n, to: path.join(pathToSource, 'i18n') },
    { from: pathToLocalStatic, to: path.join(pathToSource, 'static') },
    { from: pathToLocalLayouts, to: path.join(pathToSource, '_layouts') },
    { from: pathToLocalHtml, to: path.join(pathToSource, 'html.js') },
    { from: pathTLocalUtilsFolder, to: path.join(process.cwd(), 'utils') },
  ],
};
