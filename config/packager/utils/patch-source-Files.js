const { processSourceFilesGatsby } = require('./source-file-parsers/gatsby');

module.exports.patchSourceFiles = async flags => {
  if (flags.gatsby) {
    await processSourceFilesGatsby();
  }

  //   if (flags.graphql) {
  //     await processSourceFilesGraphql();
  //   }
};
