const { spawn } = require('child_process');
const path = require('path');
const { devServerLog } = require('../../utils/dev-server-logger');
const { isWindows } = require('../../utils/is-windows-platform');

// git commitizen runners
const LINUX_COMMAND = 'exec < /dev/tty && git cz --hook || true';

const WINDOWS_COMMAND = path.join(__dirname, 'prepare-commit-msg');

const runPrecommitExecutor = () => {
  devServerLog(
    'info',
    'runPrecommitExecutor goes on platform ',
    process.platform
  );

  const commandToExecute = isWindows() ? WINDOWS_COMMAND : LINUX_COMMAND;

  spawn(commandToExecute, {
    shell: true,
    stdio: 'inherit',
  });
};

runPrecommitExecutor();
