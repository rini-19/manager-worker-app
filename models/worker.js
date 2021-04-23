const mongoose = require("mongoose");

const WorkerSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Reward: {
      type: Number,
      default: 0,
      required: true
  }
});
module.exports = mongoose.model("Worker", WorkerSchema);