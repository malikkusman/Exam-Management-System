const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  TeacherName: {
    type: String,
    required: true,
  },
  StudentName: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
  },
  Description: {
    type: String,
  },
  Date: {
    type: Date,
  },
  File: {
    type: String,
  },
  Marks: {
    type: Number,
  },
  ObtainMarks: {
    type: Number,
  },
  Questions: [
    {
      question: { type: String },
      totalnumber: { type: Number }, // Or adjust the type based on your requirement
      obtainnumber: { type: Number }, // Or adjust the type based on your requirement
      answer: { type: String }, // Or adjust the type based on your requirement
    },
  ],
  active: {
    type: Boolean,
    required: true,
  },
},{timestamps:true});

module.exports =  mongoose.model("stuassignments", Schema);