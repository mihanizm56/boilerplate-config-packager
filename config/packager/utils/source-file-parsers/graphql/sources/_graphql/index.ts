import {
  ApolloClient,
  split,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { createInitialCache } from './create-intial-cache';

const cache = createInitialCache();

const makeHttpLink = (uri: string) => {
  const httpLink = createHttpLink({ uri });

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8080/graphql',
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  return ApolloLink.from([errorLink, splitLink]);
};

export const createClient = (uri: string) =>
  new ApolloClient({
    link: makeHttpLink(uri),
    cache,
  });
