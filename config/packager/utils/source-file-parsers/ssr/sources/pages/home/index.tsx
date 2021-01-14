import React from 'react';
import { RouteNode } from '@wildberries/service-router';
import { MainLayout } from '@/_layouts/main-layout';
import { TranslationLayout } from '@/_layouts/translation-layout';
import { Page } from './page';

const pageNode = 'home';

const action = async ({ router }) => ({
  title: 'home:title',
  content: (
    <TranslationLayout>
      <MainLayout router={router}>
        <RouteNode nodeName={pageNode}>
          {({ route, content }) => {
            if (route.name === pageNode) {
              return <Page />;
            }

            return content;
          }}
        </RouteNode>
      </MainLayout>
    </TranslationLayout>
  ),
});

export default action;
