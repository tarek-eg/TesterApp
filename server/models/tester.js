const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const testerSchema = new Schema({
  name: String,
  number: { type: String, unique: true },
  bot1: Boolean,
  bot2: Boolean,
  bot3: Boolean
});

// Create the model class
module.exports = mongoose.model("tester", testerSchema);

// Export the model
