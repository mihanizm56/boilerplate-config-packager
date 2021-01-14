import { geti18NextSync } from '@wildberries/i18next-utils';
import i18next from 'i18next';

type ParamsType = {
  locale: string;
  translations: Record<string, any>;
};

export const configureI18Next = ({ locale, translations }: ParamsType) => {
  try {
    const namespacesData = translations ? Object.keys(translations) : [];

    geti18NextSync({ locale });

    i18next.changeLanguage(locale);

    if (translations && namespacesData.length) {
      namespacesData.forEach((namespace) => {
        i18next.addResourceBundle(locale, namespace, translations[namespace]);
      });
    }
  } catch (error) {
    console.error('error then initialize i18next', error);
  }
};
