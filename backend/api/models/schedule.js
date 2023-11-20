const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  Course: {
    type: String,
    required: true,
  },
  INSTname: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
  },
},{timestamps:true});

module.exports =  mongoose.model("Courses", courseSchema);