type ParamsType = {
  browserName: string;
  userAgent: string;
};

export const getBrowserVersion = ({
  browserName,
  userAgent,
}: ParamsType): string => {
  const regExpBody = browserName === 'Safari' ? 'Version' : browserName;
  const regExp = new RegExp(`${regExpBody}/\\d+.\\d+`);
  const version = userAgent.match(regExp);

  return version ? version[0].split('/').pop() : '';
};
