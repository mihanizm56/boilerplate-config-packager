import React from 'react';
import { RouteNode } from '@wildberries/service-router';
import { Page } from './page';

const pageNode = 'error';

const action = async () => ({
  title: 'error.title',
  content: <RouteNode nodeName={pageNode}>{() => <Page />}</RouteNode>,
});

export default action;
