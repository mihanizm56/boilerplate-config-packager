import { BROWSER_LIST } from '@/_pages/wb-eu-passport/_constants';
import { getBrowserVersion } from './get-browser-version';

export const getBrowserInfo = (): string => {
  const { userAgent } = window.navigator;
  const browserNames = Object.keys(BROWSER_LIST);

  return (
    browserNames.reduce((acc, browserName) => {
      if (Boolean(acc)) {
        return acc;
      }

      if (userAgent.indexOf(browserName) > -1) {
        const browserFullName = BROWSER_LIST[browserName];
        const version = getBrowserVersion({ browserName, userAgent });

        return `${browserFullName} ${version}`;
      }

      return acc;
    }, '') || 'Unknown Browser'
  );
};
