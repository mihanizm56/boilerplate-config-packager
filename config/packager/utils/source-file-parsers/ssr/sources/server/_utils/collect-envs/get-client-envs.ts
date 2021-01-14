import { getEnvs } from './get-envs';
import { clientAvailableEnvKeys } from './available-env-keys';

export const getClientEnvs = (): string => {
  const clientEnvs = getEnvs(clientAvailableEnvKeys);

  return Object.keys(clientEnvs).reduce(
    (acc, keyName) => `${acc}${keyName}:"${clientEnvs[keyName]}",`,
    '',
  );
};
