const { readFile, stat, writeFile, readdir, mkdir } = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const { copy } = require('fs-extra');

module.exports.readFile = promisify(readFile);
module.exports.writeFile = promisify(writeFile);
module.exports.stat = promisify(stat);
module.exports.exec = promisify(exec);
module.exports.readdir = promisify(readdir);
module.exports.copy = copy;
module.exports.mkdir = promisify(mkdir);
