import "babel-polyfill"
import React from "react"
import express from "express"
import serverRenderer from "./serverRenderer"
import graphqlHTTP from "express-graphql"
import schema from "./schema/schema"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"

dotenv.config()
require("./db")
const PORT = process.env.PORT || 4000

const app = express()

const router = express.Router()

router.use(cors())

router.use("/graphql", graphqlHTTP({ schema, graphiql: true }))

router.use(express.static(path.resolve("../frontend/build")))
router.use("/public-transport-networks/static/css", express.static(path.resolve("../frontend/build/static/css")))
router.use("/public-transport-networks/static/js", express.static(path.resolve("../frontend/build/static/js")))

router.use("/*", serverRenderer)

app.use(router)

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}...`)
})
