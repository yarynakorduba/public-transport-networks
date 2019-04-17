import React from "react"

import Article from "./Article"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

const App = () => (
  <ApolloProvider client={client}>
    <Article />
  </ApolloProvider>
)

export default App
