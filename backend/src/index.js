import "babel-polyfill"
import React from "react"
import express from "express"
import serverRenderer from "./serverRenderer"
import graphqlHTTP from "express-graphql"
import schema from "./schema/schema"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"

dotenv.config({
  path: path.resolve("../.env")
})
require("./db")
const PORT = process.env.PORT || 4000

const app = express()

app
  .use(cors())
  .use("/graphql", graphqlHTTP({ schema, graphiql: true }))
  .use("/$", serverRenderer)
  .use(express.static(path.resolve("../frontend/build")))

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}...`)
})
