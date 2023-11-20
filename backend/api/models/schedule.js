const mongoose = require("mongoose");

const ScheduleSchema = mongoose.Schema({
  Course: {
    type: String,
    required: true,
  },
  INSTname: {
    type: String,
    required: true,
  },
  Day: {
    type: String,
    required: true,
  },
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
},{timestamps:true});

module.exports =  mongoose.model("Schedules", ScheduleSchema);