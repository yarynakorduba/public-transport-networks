import App from "./App"
import { Provider } from "react-redux"
import React from "react"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

const Root = ({ store }) => (
  <ApolloProvider store={store} client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)
export default Root
