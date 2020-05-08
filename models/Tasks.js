const mongoose = require("mongoose");

const Tasks = mongoose.Schema({
  jobNumber: {
    type: String,
    required: true,
  },
  SerialNumber: {
    type: String,
    required: true,
  },
  instructment: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    ref: "jobs",
  },
});

module.exports = mongoose.model("tasks", Tasks);
