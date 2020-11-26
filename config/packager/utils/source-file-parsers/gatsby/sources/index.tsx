import React from 'react';
import {
  createAppStore,
  ReduxStoreLoader,
} from '@wildberries/redux-core-modules';
import { Provider } from 'react-redux';
import { storeInjectConfig } from './_pages/wb-eu-passport/store-inject-config';
import { I18nProvider } from './i18n/_components/i18n-provider';
import { i18nextDictionary } from './i18n/dictionary';

const store = createAppStore({});

export default ({ element }: { element: ChildNode }) => (
  <I18nProvider i18nextDictionary={i18nextDictionary}>
    <ReduxStoreLoader store={store} storeInjectConfig={storeInjectConfig}>
      <Provider store={store}>{element}</Provider>
    </ReduxStoreLoader>
  </I18nProvider>
);
