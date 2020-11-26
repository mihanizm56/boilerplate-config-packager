import { geti18NextSync, getLocale } from '@wildberries/i18next-utils';
import i18next from 'i18next';
import { appNamespace } from '@/_constants/i18next/app-namespace';

i18next.createInstance();

export const I18nProvider = ({ children, i18nextDictionary }) => {
  const locale = getLocale();
  const translations = i18nextDictionary[locale];

  geti18NextSync({ appNamespace, locale });

  // устанавливаем переводы для страницы ошибок
  i18next.addResourceBundle(locale, appNamespace, translations);

  return children;
};
