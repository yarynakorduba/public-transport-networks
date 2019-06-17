const mongoose = require("mongoose")

const { USER, PASSWORD, DB } = process.env

const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0-lnwpn.mongodb.net/${DB}?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })

mongoose.connection.once("open", function() {
  console.log("MongoDB database connection established successfully")
})
