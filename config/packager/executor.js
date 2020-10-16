#!/usr/bin/env node

const path = require('path');
const colors = require('colors');
const cliProgress = require('cli-progress');
const Copier = require('@mihanizm56/node-file-copier');
const { exec } = require('./utils/fs-promises');
const { getConsoleArgs } = require('./utils/get-args');
const { packageJsonPatch } = require('./utils/package-json-patch');
const { getConfigFolderPrefix } = require('./utils/get-config-folder-prefix');

const flags = getConsoleArgs(process.argv);

const configFolderPrefix = getConfigFolderPrefix(flags);

const packageRootDir = path.join(
  process.cwd(),
  'node_modules',
  '@wildberries',
  'boilerplate-config-packager',
  'lib',
);

const configsDir = path.join(packageRootDir, configFolderPrefix, 'config');
const stylesFilesDir = path.join(packageRootDir, configFolderPrefix, 'styles');
const additionalFilesDir = path.join(
  packageRootDir,
  configFolderPrefix,
  'additional-files',
);

const arrayToCopy = [
  { from: configsDir, to: path.join(process.cwd(), 'config') },
  { from: additionalFilesDir, to: process.cwd() },
  { from: stylesFilesDir, to: path.join(process.cwd(), 'src', 'styles') },
];

const copier = new Copier({ arrayToCopy });

const cliProgressBar = new cliProgress.SingleBar({
  format: `CLI Progress |${colors.magenta(
    '{bar}',
  )}| {percentage}% || Config-packager execution`,
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
});

const runPackage = async () => {
  try {
    const cliRunner = cliProgressBar.create(100, 0, {
      processName: 'directory preparation',
    });
    cliRunner.update(20);

    await exec('npm install @wildberries/boilerplate-config-packager');
    cliRunner.update(40);

    copier.activate();
    cliRunner.update(60);

    await packageJsonPatch(configFolderPrefix);
    cliRunner.update(80);

    await exec('npm uninstall @wildberries/boilerplate-config-packager');
    cliRunner.update(100);
  } catch (error) {
    console.log('error when executing the package', error);
    process.exit(1);
  }
};

runPackage();
