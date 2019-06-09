const mongoose = require("mongoose")

const Schema = mongoose.Schema

const City = new Schema({
  _id: { type: String, required: true },
  label: { type: String, required: true },
  stops: { type: Array, required: true },
  stationTypes: { type: Array, required: true },
  boundaries: { type: Schema.Types.Mixed }
})

module.exports = mongoose.model("City", City)
