const graphql = require("graphql")
const city = require("../models/cities")

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLFloat } = graphql

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

const CityType = new GraphQLObjectType({
  name: "City",
  fields: () => ({
    id: { type: GraphQLString },
    cityLabel: { type: GraphQLString },
    stationTypes: { type: new GraphQLList(GraphQLString) },
    stops: { type: new GraphQLList(StopType) }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    city: {
      type: CityType,
      args: { city: { type: GraphQLString } },
      async resolve(parent, { city: id }) {
        const cityData = await city.findById(id).exec()
        return cityData
      }
    },
    cities: {
      type: GraphQLList(CityType),
      args: {},
      async resolve() {
        const cities = await city.find().exec()
        return cities
      }
    },
    stops: {
      type: GraphQLList(StopType),
      args: { city: { type: GraphQLString } },
      async resolve(parent, { city: id }) {
        const cityStopsData = await city.findById(id).exec()
        return cityStopsData.stops
      }
    },
    stationTypes: {
      type: GraphQLList(GraphQLString),
      args: { city: { type: GraphQLString } },
      async resolve(parent, { city: id }) {
        const cityStopsData = await city.findById(id).exec()
        return cityStopsData.stationTypes
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
