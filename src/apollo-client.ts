import { ApolloLink, concat, HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

let AUTH_TOKEN: string | undefined;

async function fetchToken() {
  if(AUTH_TOKEN){
    return AUTH_TOKEN;
  }

  const response = await fetch("https://take-home-be.onrender.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation {
          register {
            _id
            token
            cartId
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  AUTH_TOKEN = data?.register?.token;

  return AUTH_TOKEN;
}

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const token = await fetchToken();

  const authMiddleware = new ApolloLink((operation, forward) => {
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    
    return forward(operation);
  });

  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: "https://take-home-be.onrender.com/api",
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    // fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
});