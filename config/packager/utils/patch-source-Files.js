const { processSourceFilesGatsby } = require('./source-file-parsers/gatsby');
const { processSourceFilesGraphql } = require('./source-file-parsers/graphql');
const { processSourceFilesSSR } = require('./source-file-parsers/ssr');

module.exports.patchSourceFiles = async flags => {
  if (flags.gatsby) {
    await processSourceFilesGatsby();
  }

  if (flags.graphql) {
    await processSourceFilesGraphql();
  }

  if (flags.ssr) {
    await processSourceFilesSSR();
  }
};
