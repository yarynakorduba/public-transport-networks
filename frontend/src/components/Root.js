import App from "./App"
import React from "react"
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import { persistCache } from "apollo-cache-persist"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-client"
import { onError } from "apollo-link-error"
import introspectionQueryResultData from "../api/fragmentTypes.json"
import fetch from "node-fetch"

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

let cache = new InMemoryCache({ fragmentMatcher })
;(async () => {
  try {
    return (cache = await persistCache({
      cache,
      storage: window.localStorage
    }))
  } catch (e) {
    return cache
  }
})()

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({ uri: `${process.env.REACT_APP_API}/graphql`, fetch: fetch })
  ]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "cache-first"
    }
  }
})

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
export default Root
