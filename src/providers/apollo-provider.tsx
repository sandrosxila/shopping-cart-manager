"use client";

import { HttpLink, ApolloLink, concat, split } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import Cookies from 'js-cookie';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from "@apollo/client/utilities";

// have a function to create a client for you
function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    fetchOptions: { cache: "no-store" },
  });
  
  const wsLink = new GraphQLWsLink(createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL_WSS!,
    connectionParams: () => {
      const token = Cookies.get('authToken');

      return {
        authToken: token
      }
    },
    disablePong: false,
    retryAttempts: 3,
    keepAlive: 60 * 1000,
  }));
  
  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
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

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = Cookies.get('authToken');

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return forward(operation);
  });

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: concat(authMiddleware, splitLink),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
