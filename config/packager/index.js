#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
const { exec, writeFile } = require('./fs-promises');
const commandsFile = require('./commands/commands.json');

const fromFolder = path.join(
  process.cwd(),
  'node_modules',
  '@wildberries',
  'boilerplate-config-packager',
  'lib',
);

const toFolder = path.join(process.cwd(), 'config');

const arrayToCopy = [{ from: fromFolder, to: toFolder }];

const copier = new Copier({ arrayToCopy });

const addPackageJsonCommands = async () => {
  try {
    const { scripts, devDependencies, dependencies } = commandsFile;

    const packageJsonProjectFile = require(path.join(process.cwd(),'package.json')); // eslint-disable-line

    const newPackage = {
      ...packageJsonProjectFile,
      scripts,
      dependencies: {
        ...packageJsonProjectFile.dependencies,
        ...dependencies,
      },
      devDependencies: {
        ...packageJsonProjectFile.devDependencies,
        ...devDependencies,
      },
    };

    await writeFile(
      path.join(process.cwd(), 'package.json'),
      JSON.stringify(newPackage, null, 2),
      'utf8',
    );
  } catch (error) {
    console.log('get an error when getting package', error);
  }
};

const runPackage = async () => {
  try {
    console.log('(config-packager): start to execute');

    await exec('npm install @wildberries/boilerplate-config-packager');

    console.log('(config-packager): start to copy');

    copier.activate();

    console.log('(config-packager): start to patch package.json');

    // await addPackageJsonCommands(); todo add

    await exec('npm uninstall @wildberries/boilerplate-config-packager');

    // console.log('(config-packager): start install cli packages');

    // await exec('npm install');

    console.log('(config-packager): installed successfully');
  } catch (error) {
    console.log("error when executing the package", error); // eslint-disable-line
  }
};

runPackage();
