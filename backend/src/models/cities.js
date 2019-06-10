const mongoose = require("mongoose")

const Schema = mongoose.Schema

const City = new Schema({
  _id: { type: String, required: true },
  label: { type: String, required: true },
  stops: { type: Array, required: true },
  stationTypes: { type: Array, required: true },
  boundaries: { type: Schema.Types.Mixed },
  routesNumber: { type: Number },
  stopsNumber: { type: Number },
  squareKm: { type: Number },
  population: { type: Number },
  averageStopsOnRoute: { type: Number }
})

module.exports = mongoose.model("City", City)
