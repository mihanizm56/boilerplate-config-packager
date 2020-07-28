const path = require('path');

const dokerFilePath = path.join(
  process.cwd(),
  'config',
  'deploy',
  'Dockerfile',
);

module.exports.DOCKER_STOP_COMMAND =
  'docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)';

module.exports.DOCKER_RUN_COMMAND = `build -t test -f ${dokerFilePath} ${process.cwd()} && docker run -it --rm -d -p 443:443 test`;
