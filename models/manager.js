const mongoose = require("mongoose");

const ManagerSchema = mongoose.Schema({
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
});
module.exports = mongoose.model("Manager", ManagerSchema);