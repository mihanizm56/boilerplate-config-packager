#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
const { exec } = require('./utils/fs-promises');
const { getConsoleArgs } = require('./utils/get-args');
const { packageJsonPatch } = require('./utils/package-json-patch');

const flags = getConsoleArgs(process.argv);

const configParameter = flags.euro ? 'eu' : 'ru';

const packageRootDir = path.join(
  process.cwd(),
  'node_modules',
  '@wildberries',
  'boilerplate-config-packager',
  'lib',
);

const configsDir = path.join(packageRootDir, configParameter, 'config');

const additionalFilesDir = path.join(
  packageRootDir,
  configParameter,
  'additional-files',
);

const arrayToCopy = [
  { from: configsDir, to: path.join(process.cwd(), 'config') },
  { from: additionalFilesDir, to: process.cwd() },
];

const copier = new Copier({ arrayToCopy });

const runPackage = async () => {
  try {
    console.log('(config-packager): start to execute');

    await exec(
      'npm install @wildberries/boilerplate-config-packager@0.0.68-beta.2',
    );

    console.log('(config-packager): start to copy');

    copier.activate();

    console.log('(config-packager): start to patch package.json');

    await packageJsonPatch(configParameter);

    console.log('(config-packager): package.json patched successfuly');

    await exec(
      'npm uninstall @wildberries/boilerplate-config-packager@0.0.68-beta.2',
    );
  } catch (error) {
    console.log('error when executing the package', error);
    process.exit(1);
  }
};

runPackage();
