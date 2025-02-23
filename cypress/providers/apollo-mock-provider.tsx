
import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

interface ApolloMockProviderProps {
  mocks: MockedResponse[];
  children: React.ReactNode;
}

export const ApolloMockProvider: React.FC<ApolloMockProviderProps> = ({ mocks, children }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);