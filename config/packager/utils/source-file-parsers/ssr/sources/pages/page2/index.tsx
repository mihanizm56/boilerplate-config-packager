import React from 'react';
import { RouteNode } from '@wildberries/service-router';
import { MainLayout } from '@/_layouts/main-layout';
import { TranslationLayout } from '@/_layouts/translation-layout';
import { Page } from './page';

const pageNode = 'page2';

const action = async ({ router }) => ({
  title: 'page2:title',
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
