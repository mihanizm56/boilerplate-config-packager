const dotenv = require('dotenv');

dotenv.config();

const dockerPort = process.env.PLT_IMAGE_PORT || 443;
const dockerName = process.env.PLT_IMAGE_NAME || 'local';

const getDockerRunCommand = () =>
  ` stop ${dockerName} || docker run --name ${dockerName} -it --rm -d -v $(pwd)/config/test-certs:/certs -v $(pwd)/config/deploy/nginx.conf:/etc/nginx/nginx.conf -v $(pwd)/build:/usr/share/metadata/core/build -p ${dockerPort}:443 fholzer/nginx-brotli nginx -g 'daemon off;'`;
const getDockerStopCommand = () => `docker stop ${dockerName}`;
module.exports = {
  getDockerRunCommand,
  getDockerStopCommand,
  dockerPort,
  dockerName,
};
