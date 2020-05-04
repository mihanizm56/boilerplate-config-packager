const path = require('path');
const commandsFileEU = require('../commands/commands-eu.json');
const commandsFileRU = require('../commands/commands-ru.json');
const { writeFile } = require('./fs-promises');

module.exports.packageJsonPatch = async parameter => {
  try {
    const commandsFile = parameter === 'eu' ? commandsFileEU : commandsFileRU;

    const {
      scripts,
      devDependencies,
      dependencies,
      browserslist,
      resolutions,
      babel,
      eslintConfig,
      configOverridesPath,
      config,
      husky,
    } = commandsFile;

    // eslint-disable-next-line
    const packageJsonProjectFile = require(path.join(
      process.cwd(),
      'package.json',
    ));

    const newPackage = {
      ...packageJsonProjectFile,
      scripts: {
        ...packageJsonProjectFile.scripts,
        ...scripts,
      },
      dependencies: {
        ...packageJsonProjectFile.dependencies,
        ...dependencies,
      },
      devDependencies: {
        ...packageJsonProjectFile.devDependencies,
        ...devDependencies,
      },
      resolutions,
      browserslist,
      babel,
      eslintConfig,
      config,
      husky,
      'config-overrides-path': configOverridesPath,
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
