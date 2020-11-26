const path = require('path');
const { spawnSync } = require('child_process');
const dotenv = require('dotenv');

dotenv.config();

// temploy params
const repoName = process.env.REPO_NAME;
const deployToken = process.env.DEPLOY_TOKEN;
const DEPLOY_FILE_PATH = path.join(
  process.cwd(),
  'config',
  'deploy',
  'template_ci.sh',
);

const runTemployExecutor = () =>
  new Promise(async (resolve) => {
    if (
      !repoName ||
      repoName === 'undefined' ||
      !deployToken ||
      deployToken === 'undefined'
    ) {
      console.log('PLEASE, PROVIDE ALL ENVS (npm run setup)');

      return;
    }

    const commandToDeploy = `bash ${DEPLOY_FILE_PATH} ${repoName} ${deployToken} empty_project test undefined undefined undefined true`;

    spawnSync(commandToDeploy, {
      shell: true,
      stdio: 'inherit',
    });

    resolve();
  });

const executor = async () => {
  await runTemployExecutor();
  console.log(
    'NOW WILL BE AN ERROR - THIS IS VERY NORMAL - YOUR JOB SUCCEEDED',
  );

  process.kill(process.pid);
};

executor();
