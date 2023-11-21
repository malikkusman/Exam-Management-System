const Course = require('../models/courseSchema')
var { db } = require('../utils.js/mongodb');

async function Addcourse(req, res) {
    try {
        const cname = req.body.course
        const instname = req.body.instname
        const dedescription = req.body.description
        const active = true
        const data = {
            Course: cname,
            INSTname: instname,
            Description: dedescription,
            active: active
        }
        console.log('data', data)
        db.collection('courses').insertOne(data, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                const responseData = { message: 'added' };
                res.status(200).json(responseData);
            }
        })
    }
    catch (e) {
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
      const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
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
      const deletedCourse = await Course.findByIdAndRemove(id);
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