const remove = require('rmfr');
const Copier = require('@mihanizm56/node-file-copier');
const { removeSources, createSources } = require('./config');

const copier = new Copier({ arrayToCopy: createSources });

module.exports.processSourceFilesGraphql = async () => {
  // remove all unnecessary files and folders
  await Promise.all(removeSources.map(deletePath => remove(deletePath)));

  // copy all unnecessary files and folders from local
  copier.activate();
};
