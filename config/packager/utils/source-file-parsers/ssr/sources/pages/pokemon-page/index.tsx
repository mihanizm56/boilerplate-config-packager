import React from 'react';
import { ReduxStoreLoader } from '@wildberries/redux-core-modules';
import { RouteNode } from '@wildberries/service-router';
import { MainLayout } from '@/_layouts/main-layout';
import { TranslationLayout } from '@/_layouts/translation-layout';
import { Page } from './page';
import { storeInjectConfig } from './store-inject-config';

const pageNode = 'pokemon-page';

const action = async ({ fromState, toState, router }) => ({
  title: 'pokemon-page.title',
  storeInjectConfig,
  content: (
    <ReduxStoreLoader
      fromState={fromState}
      storeInjectConfig={storeInjectConfig}
      toState={toState}
    >
      <TranslationLayout>
        <MainLayout router={router}>
          <RouteNode nodeName={pageNode}>{() => <Page />}</RouteNode>
        </MainLayout>
      </TranslationLayout>
    </ReduxStoreLoader>
  ),
});

export default action;
