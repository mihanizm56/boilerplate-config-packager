import 'reset-css';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureRouter } from '@wildberries/service-router';
import { ApolloProvider } from '@apollo/react-hooks';
import { App } from '@/_components/app';
import { routes } from '@/pages/routes';
import { createClient } from '@/_graphql';
import '@/styles/global.css';
import '@/styles/variables.module.scss';

const ROOT_ELEMENT = document.getElementById('root');

// set router configuration
const router = configureRouter({
  defaultRoute: 'home',
});
router.setDependencies({
  routes,
});
router.add(routes);

// set api configuration
const API_URI = 'http://localhost:8080/graphql';
const client = createClient(API_URI);

// run application
router.start(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App router={router} />
    </ApolloProvider>,
    ROOT_ELEMENT,
  );
});
