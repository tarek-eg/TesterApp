// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const routes = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

// DB Setup
mongoose.connect(config.db, {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
});

// App Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
});

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
  console.log("Server listening on:", port);
});
