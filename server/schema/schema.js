const graphql = require("graphql")
const fs = require("fs")
const { find, propEq } = require("ramda")
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLFloat } = graphql

const getCityStops = city => {
  return new Promise((resolve, reject) =>
    fs.readFile(`../public/data/${city}/${city}Stops.json`, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data))
    })
  )
}

const stopsData = {
  bristol: getCityStops("bristol"),
  lviv: getCityStops("lviv")
}

const StopType = new GraphQLObjectType({
  name: "Stop",
  fields: () => ({
    id: { type: GraphQLID },
    label: { type: GraphQLString },
    stationType: { type: new GraphQLList(GraphQLString) },
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
    connections: { type: new GraphQLList(GraphQLString) },
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
        const result = find(propEq("id", id), stopsData[city])
        return result
      }
    },
    stops: {
      type: GraphQLList(StopType),
      args: { city: { type: GraphQLString } },
      async resolve(parent, { city }) {
        const cityStopsData = await getCityStops(city)
        return cityStopsData.stops
      }
    },
    stationTypes: {
      type: GraphQLList(GraphQLString),
      args: { city: { type: GraphQLString } },
      async resolve(parent, { city }) {
        const cityStopsData = await getCityStops(city)
        return cityStopsData.stationTypes
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
