const { processSourceFilesGatsby } = require('./source-file-parsers/gatsby');
const { processSourceFilesGraphql } = require('./source-file-parsers/graphql');

module.exports.patchSourceFiles = async flags => {
  if (flags.gatsby) {
    await processSourceFilesGatsby();
  }

  if (flags.graphql) {
    await processSourceFilesGraphql();
  }
};
