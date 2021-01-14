/* eslint-disable no-console */

const { spawn } = require('child_process');
const path = require('path');

const isWindows = () =>
  process.platform === 'win32' || process.platform === 'win64';

// git commitizen runners
const LINUX_COMMAND = 'exec < /dev/tty && git cz --hook || true';

const WINDOWS_COMMAND = path.join(__dirname, 'prepare-commit-msg');

const runPrecommitExecutor = () => {
  console.log('runPrecommitExecutor goes on platform ', process.platform);

  const commandToExecute = isWindows() ? WINDOWS_COMMAND : LINUX_COMMAND;
/* eslint-disable no-console */
  spawn(commandToExecute, {
    shell: true,
    stdio: 'inherit',
  });
};

runPrecommitExecutor();
