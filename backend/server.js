const express = require("express")
const cors = require("cors");

require("dotenv").config()

const dbConfig = require("./config/dbConfig")
const app = express()
app.use(express.json())
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const theaterRoute = require("./routes/theaterRoute");
const showRoute = require("./routes/showRoute");
const bookRoute = require("./routes/bookingRoute");

app.use(cors());
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/theaters", theaterRoute)
app.use("/api/shows", showRoute)
app.use("/api/booking", bookRoute)
// Common ports are -> (for a server)
// 5000, 8000, 8080
// Frontend -> 3000, 5431
app.listen(8080, () => {
    console.log(`Server has started! in port 8080`);
})