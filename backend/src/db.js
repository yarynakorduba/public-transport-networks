const mongoose = require("mongoose")

const MONGO_USERNAME = "yarycka"
const MONGO_PASSWORD = "zhbyf37vn"
const MONGO_HOSTNAME = "127.0.0.1"
const MONGO_PORT = "27017"
const MONGO_DB = "publicTransportNetworks"

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
mongoose.connect(url, {useNewUrlParser: true});

mongoose.connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})