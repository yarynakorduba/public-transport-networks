const mongoose = require("mongoose")

const { MONGO_URL } = process.env
mongoose.connect(MONGO_URL, { useNewUrlParser: true })

mongoose.connection.once("open", function() {
  console.log("MongoDB database connection established successfully")
})
