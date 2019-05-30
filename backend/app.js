const express = require("express")
const graphqlHTTP = require("express-graphql")
const schema = require("./schema/schema")
const cors = require("cors")

const app = express()
const PORT = 4000
//allow cross-origin requests
app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
)
app.use(express.static("public"))
app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}...`)
})
