const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
  },
  Username: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
},{timestamps:true});

module.exports =  mongoose.model("Attendances", attendanceSchema);