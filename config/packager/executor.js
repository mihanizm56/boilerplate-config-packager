#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
const { exec } = require('./utils/fs-promises');
const { getConsoleArgs } = require('./utils/get-args');
const { packageJsonPatch } = require('./utils/package-json-patch');
const { getConfigFolderPrefix } = require('./utils/get-config-folder-prefix');
const { patchSourceFiles } = require('./utils/patch-source-Files');

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

const runPackage = async () => {
  try {
    await exec('npm install @wildberries/boilerplate-config-packager');

    copier.activate();

    await packageJsonPatch(configFolderPrefix);

    await patchSourceFiles(flags);

    await exec('npm uninstall @wildberries/boilerplate-config-packager');
  } catch (error) {
    console.log('error when executing the package', error);
    process.exit(1);
  }
};

runPackage();
