const express = require("express")
const graphqlHTTP = require("express-graphql")
const schema = require("./schema/schema")
const cors = require("cors")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 4000
//allow cross-origin requests
app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
)
app.use(express.static(path.join(__dirname, "..", "public")))

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "public", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}...`)
})
