const graphql = require("graphql")
const city = require("../models/cities")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLUnionType
} = graphql
const { PolygonObject, MultiPolygonObject } = require("graphql-geojson")

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

const resolveType = data => {
  if (data.type === "Polygon") return PolygonObject
  if (data.type === "MultiPolygon") return MultiPolygonObject
}

const BoundariesType = new GraphQLUnionType({
  name: "BoundariesType",
  types: [PolygonObject, MultiPolygonObject],
  resolveType: resolveType
})

const CityType = new GraphQLObjectType({
  name: "City",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    stationTypes: { type: new GraphQLList(GraphQLString) },
    stops: { type: new GraphQLList(StopType) },
    color: { type: GraphQLString },
    cityLabel: { type: GraphQLString },
    boundaries: { type: BoundariesType }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    city: {
      type: CityType,
      args: { city: { type: GraphQLString } },
      async resolve(parent, { city: id }) {
        return city.findById(id)
      }
    },
    cities: {
      type: GraphQLList(CityType),
      args: {},
      async resolve() {
        return city.find()
      }
    },
    stops: {
      type: GraphQLList(StopType),
      args: { city: { type: GraphQLString } },
      async resolve(parent, { city: id }) {
        const cityStopsData = city.findById(id).exec()
        return cityStopsData.stops
      }
    },
    stationTypes: {
      type: GraphQLList(GraphQLString),
      args: { city: { type: GraphQLString } },
      async resolve(parent, { city: id }) {
        const cityStopsData = city.findById(id).exec()
        return cityStopsData.stationTypes
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
