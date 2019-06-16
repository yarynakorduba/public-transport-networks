import "babel-polyfill"
import React from "react"
import { renderToString } from "react-dom/server"
import express from "express"
import serverRenderer from "./serverRenderer"
import dotenv from "dotenv"
import graphqlHTTP from "express-graphql"
import schema from "./schema/schema"
import cors from "cors"
import path from "path"

dotenv.config()
require("./db")

const app = express()

const router = express.Router()

const PORT = process.env.PORT || 4000

//allow cross-origin requests
router.use(cors())

router.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

router.use("^/$", serverRenderer)

router.use(express.static(path.resolve("..", "frontend", "build")))
router.use(
  "/public-transport-networks/static/css",
  express.static(path.resolve("..", "frontend", "build", "static", "css"))
)
router.use(
  "/public-transport-networks/static/js",
  express.static(path.resolve("..", "frontend", "build", "static", "js"))
)

app.use(router)

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}...`)
})
