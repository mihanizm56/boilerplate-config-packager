const { spawn } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
const { devServerLog } = require('../../utils/dev-server-logger');

dotenv.config();

// temploy params
const repoName = process.env.REPO_NAME;
const deployToken = process.env.DEPLOY_TOKEN;
const projectName = process.env.PROJECT_NAME;
const DEPLOY_FILE_PATH = path.join(
  process.cwd(),
  'config',
  'deploy',
  'template_ci.sh'
);

const runTemployExecutor = () => {
  if (
    !repoName ||
    repoName === 'undefined' ||
    !deployToken ||
    deployToken === 'undefined' ||
    !projectName ||
    projectName === 'undefined'
  ) {
    return;
  }

  const commandToDeploy = `bash ${DEPLOY_FILE_PATH} ${repoName} ${deployToken} ${projectName} test`;

  spawn(commandToDeploy, {
    shell: true,
    stdio: 'inherit',
  });
};

runTemployExecutor();
