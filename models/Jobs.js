const mongoose = require("mongoose");

const Jobs = mongoose.Schema({
  problem: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  responPerson: {
    type: String,
    required: true,
  },
  otherReference: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  duration: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  serverType: {
    type: String,
    default: null,
  },
  clientSigh: {
    type: String,
    default: null,
  },
  kySigh: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("jobs", Jobs);
