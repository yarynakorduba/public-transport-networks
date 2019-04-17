const graphql = require("graphql")
const fs = require("fs")
const { find, propEq } = require("ramda")
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLFloat } = graphql

const stopsData = {
  bristol: JSON.parse(fs.readFileSync(`../public/data/bristol/bristolStops.json`)),
  lviv: JSON.parse(fs.readFileSync(`../public/data/lviv/lvivStops.json`))
}

const StopType = new GraphQLObjectType({
  name: "Stop",
  fields: () => ({
    id: { type: GraphQLID },
    label: { type: GraphQLString },
    stationType: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
    connections: {
      type: new GraphQLList(StopType),
      resolve(parent) {
        return parent.connections.map(connection => find(propEq("id", connection))(stopsData[parent.city]))
      }
    },
    routes: { type: GraphQLList(GraphQLString) }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    stop: {
      type: StopType,
      args: { city: { type: GraphQLString }, id: { type: GraphQLID } },
      resolve(parent, { id, city }) {
        console.log(city, parent)
        return Promise.resolve(find(propEq("id", id))(stopsData[city])).then(v =>
          Object.assign({}, v, {
            city
          })
        )
      }
    },
    stops: {
      type: GraphQLList(StopType),
      args: { city: { type: GraphQLString } },
      resolve(parent, { city }) {
        return JSON.parse(fs.readFileSync(`../public/data/${city}/${city}Stops.json`))
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
