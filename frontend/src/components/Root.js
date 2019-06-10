import App from "./App"
import React from "react"
import { InMemoryCache } from "apollo-cache-inmemory"
import { persistCache } from "apollo-cache-persist"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-client"
import { onError } from "apollo-link-error"

const cache = new InMemoryCache()
;(async () =>
  await persistCache({
    cache,
    storage: window.localStorage
  }))()

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({ uri: "http://localhost:4000/graphql" })
  ]),
  cache
})

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
export default Root
