export const getEnvs = (
  availableEnvKeys: Array<string>,
): Record<string, string> =>
  availableEnvKeys.reduce((acc, availiableEnv) => {
    if (availiableEnv in process.env) {
      return { ...acc, [availiableEnv]: process.env[availiableEnv] };
    }

    return acc;
  }, {});
