import { serverAvailableEnvKeys } from './available-env-keys';
import { getEnvs } from './get-envs';

export const setServerEnvs = () => {
  const envs = getEnvs(serverAvailableEnvKeys);

  (global as any).env = envs;
};
