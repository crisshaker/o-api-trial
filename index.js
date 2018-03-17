const http = require("http");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/o-api");
mongoose.connection
  .once("open", () => console.log("Success: Connected to Database"))
  .on("error", () => console.log("Error: Database Connection failed"));

require("./models");
require("./routes")(app);

const PORT = process.env.PORT || 3000;
http
  .createServer(app)
  .listen(PORT)
  .on("listening", () => console.log(`Server running on PORT ${PORT}`));
