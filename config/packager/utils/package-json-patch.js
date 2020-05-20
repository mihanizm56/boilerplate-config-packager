const path = require('path');
const commandsFileEU = require('../commands/commands-eu.json');
const commandsFileRU = require('../commands/commands-ru.json');
const { writeFile } = require('./fs-promises');

module.exports.packageJsonPatch = async parameter => {
  try {
    const commandsFile = parameter === 'eu' ? commandsFileEU : commandsFileRU;

    // eslint-disable-next-line
    const packageJsonProjectFile = require(path.join(
      process.cwd(),
      'package.json',
    ));

    const newPackage = {
      ...packageJsonProjectFile,
      scripts: {
        ...packageJsonProjectFile.scripts,
        ...commandsFile.scripts,
      },
      dependencies: {
        ...packageJsonProjectFile.dependencies,
        ...commandsFile.dependencies,
      },
      devDependencies: {
        ...packageJsonProjectFile.devDependencies,
        ...commandsFile.devDependencies,
      },
      resolutions: {
        ...packageJsonProjectFile.resolutions,
        ...commandsFile.resolutions,
      },
      browserslist: {
        ...packageJsonProjectFile.browserslist,
        ...commandsFile.browserslist,
      },
      babel: {
        ...packageJsonProjectFile.babel,
        ...commandsFile.babel,
      },
      eslintConfig: {
        ...packageJsonProjectFile.eslintConfig,
        ...commandsFile.eslintConfig,
      },
      stylelint: {
        ...packageJsonProjectFile.stylelint,
        ...commandsFile.stylelint,
      },
      config: {
        ...packageJsonProjectFile.config,
        ...commandsFile.config,
      },
      husky: {
        ...packageJsonProjectFile.husky,
        ...commandsFile.husky,
      },
      'config-overrides-path': commandsFile['config-overrides-path'],
    };

    await writeFile(
      path.join(process.cwd(), 'package.json'),
      JSON.stringify(newPackage, null, 2),
      'utf8',
    );
  } catch (error) {
    console.log('get an error when getting package', error);
    process.exit(1);
  }
};
