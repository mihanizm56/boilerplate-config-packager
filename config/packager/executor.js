#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
const { exec } = require('./utils/fs-promises');
const { getConsoleArgs } = require('./utils/get-args');
const {
  packageJsonPatchEU,
  packageJsonPatchRU,
} = require('./utils/package-json-patch');

const flags = getConsoleArgs(process.argv);

const configPath = flags.euro ? 'eu' : 'ru';
const packageJsonPatch = flags.euro ? packageJsonPatchEU : packageJsonPatchRU;

const fromFolder = path.join(
  process.cwd(),
  'node_modules',
  '@wildberries',
  'boilerplate-config-packager',
  'lib',
  configPath,
);

const toFolder = path.join(process.cwd(), 'config');

const arrayToCopy = [{ from: fromFolder, to: toFolder }];

const copier = new Copier({ arrayToCopy });

const runPackage = async () => {
  try {
    console.log('(config-packager): start to execute');

    await exec(
      'npm install @wildberries/boilerplate-config-packager@0.0.2-beta.10',
    );

    console.log('(config-packager): start to copy');

    copier.activate();

    console.log('(config-packager): start to patch package.json');

    await packageJsonPatch();

    await exec('npm uninstall @wildberries/boilerplate-config-packager');

    console.log('(config-packager): start install cli packages');

    await exec('npm install');

    console.log('(config-packager): installed successfully');
  } catch (error) {
    console.log("error when executing the package", error); // eslint-disable-line
  }
};

runPackage();
