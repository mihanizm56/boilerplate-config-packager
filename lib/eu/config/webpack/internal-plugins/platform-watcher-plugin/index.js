const { spawn, exec } = require('child_process');
const ip = require('ip');
const { getFinishedLog, getLoadingLog, getCrashedLog } = require('./logs');
const { DOCKER_STOP_COMMAND, DOCKER_RUN_COMMAND } = require('./commands');
const { reloadTrigger } = require('./reload-trigger');

const ipAddress = ip.address();

module.exports = class PlatformBuildWithWatchPlugin {
  handlerModulesBuild() {
    const child = spawn('docker', [DOCKER_RUN_COMMAND], {
      shell: true,
      detached: true,
      // to get REAL logs
      // stdio:'inherit'
    });

    child.stdout.on('end', () => {
      getFinishedLog(ipAddress);
      reloadTrigger();
    });

    child.on('error', error => () => getCrashedLog(error));
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('CustomPlugin', compilation => {
      compilation.hooks.needAdditionalPass.tap(
        'CustomPlugin',
        this.handlerModulesBuild,
      );
    });

    compiler.plugin('beforeCompile', () => {
      getLoadingLog();

      exec(
        DOCKER_STOP_COMMAND,
        {
          shell: true,
        },
        // to get REAL logs
        // (error, output) => console.log(output),
      );
    });
  }
};
