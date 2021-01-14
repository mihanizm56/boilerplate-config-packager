import { LOCALE_COOKIE } from '@/_utils/cookies/_constants';

type ParamsType = {
  locale: string;
  namespace: string;
};

export const DEFAULT_LOCALE = 'ru';

export const getLocaleFromCookies = (cookie) =>
  cookie.get(LOCALE_COOKIE) || DEFAULT_LOCALE;

export const getI18nextRequestEndpoint = ({
  locale,
  namespace,
}: ParamsType) => {
  if (__CLIENT__) {
    return `/I18N/${namespace}/${locale}`;
  }

  return __DEV__
    ? `http://localhost:${env.PORT}/I18N/${namespace}/${locale}`
    : `${env.I18N_ENDPOINT}/I18N/${namespace}/${locale}`;
};
