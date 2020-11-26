import React from 'react';
import {
  createAppStore,
} from '@wildberries/redux-core-modules';
import { Provider } from 'react-redux';
import { I18nProvider } from './i18n/_components/i18n-provider';
import { i18nextDictionary } from './i18n/dictionary';

const store = createAppStore({});

export default ({ element }: { element: ChildNode }) => (
  <I18nProvider i18nextDictionary={i18nextDictionary}>
      <Provider store={store}>{element}</Provider>
  </I18nProvider>
);
