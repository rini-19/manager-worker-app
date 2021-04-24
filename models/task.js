const mongoose = require("mongoose");
const Manager = require("./manager");
const Worker = require("./worker")

const TaskSchema = mongoose.Schema({
  MId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
    required: true,
  },
  WId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: false,
  },
  Heading: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Time: {
    Days: {
        type: Number,
        default: 0,
        required: true,
    },
    Hrs: {
        type: Number,
        default: 0,
        required: true,
    },
    Mins: {
        type: Number,
        default: 0,
        required: true,
        
    }
  },
  TotalPoints: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    default: 'pending',
    required: true,
  },
  ReviewUpdate: {
    type: String,
    required: false,
  },
  ContentTxt: {
    type: String,
    required: false,
  },
  ContentFile: {
      data: Buffer,
      contentType: String,
      required: false
  }
});
module.exports = mongoose.model("Task", TaskSchema);