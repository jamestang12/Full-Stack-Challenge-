const mongoose = require("mongoose");

const Materials = mongoose.Schema({
  itemNumber: {
    type: String,
    required: true,
  },
  part: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    ref: "jobs",
  },
});

module.exports = mongoose.model("materials", Materials);
