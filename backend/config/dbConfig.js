const mongoose = require("mongoose")

mongoose.connect(process.env.DB_STRING)
const connection = mongoose.connection
console.log("DB String",process.env.DB_STRING);

mongoose.connection.on("connected", (err, res) => {

  console.log("mongoose is connected")

})
connection.on("connected", () => {
    console.log("Db is connected")
})

mongoose.connection.on("error", err => {

    console.log("err", err)
  
  })




