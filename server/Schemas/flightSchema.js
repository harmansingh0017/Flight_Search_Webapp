const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
  flightName: {
    type: String
  },
  originCity: {
    type: String
  },
  destination: {
    type: String
  },
  departure: {
    type: String
  },
  passenger: {
    type: String
  }
});

module.exports = mongoose.model("flight", flightSchema);
