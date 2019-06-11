const mongoose = require("mongoose")

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0-lnwpn.mongodb.net/${
  process.env.DB
}?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })

mongoose.connection.once("open", function() {
  console.log("MongoDB database connection established successfully")
})
