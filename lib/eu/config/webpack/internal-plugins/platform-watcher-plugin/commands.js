const path = require('path');
const dotenv = require('dotenv');

const dokerFilePath = path.join(
  process.cwd(),
  'config',
  'deploy',
  'Dockerfile',
);

dotenv.config();

const dockerPort = process.env.PLT_PORT || 443;

module.exports.DOCKER_STOP_COMMAND =
  'docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)';

module.exports.DOCKER_RUN_COMMAND = `build -t test -f ${dokerFilePath} ${process.cwd()} && docker run -it --rm -d -p ${dockerPort}:443 test`;
