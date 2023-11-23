const Course = require('../models/courseSchema')
var { db } = require('../utils/mongodb');

async function Addcourse(req, res) {
  try {
    const cname = req.body.course;
    const instname = req.body.instname;
    const dedescription = req.body.description;
    const active = true;

    const newCourse = new Course({
      Course: cname,
      INSTname: instname,
      Description: dedescription,
      active: active
    });

    await newCourse.save(); // Save the new course using Mongoose

    const responseData = { message: 'Course added' };
    res.status(200).json(responseData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

async function getCourse(req, res) {
  try {
    const course = await Course.find();
    res.status(200).json(course);
  } catch (error) {
    console.error('Error while finding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function updateCourse(req, res) {
  try {
    const id = req.query.id;
    const updatedCourse = await Course.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    console.log(updatedCourse)
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//delete the product by id
async function deleteCourse(req, res) {
  try {
    const id = req.query.id;
    console.log(id);
    const deletedCourse = await Course.findByIdAndRemove({ _id: id });
    const responseData = { message: 'deleted' };
    res.status(204).json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  Addcourse,
  getCourse,
  updateCourse,
  deleteCourse,
};