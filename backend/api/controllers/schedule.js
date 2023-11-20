const Schedule = require('../models/schedule')
var { db } = require('../utils.js/mongodb');

async function Addschedule(req, res) {
    try {
        const cname = req.body.course
        const instname = req.body.instname
        const day = req.body.day
        const from = req.body.from
        const to = req.body.to
        const active = true
        const data = {
            Course: cname,
            INSTname: instname,
            Day: day,
            From: from,
            To: to,
            active: active
        }
        console.log('data', data)
        db.collection('schedules').insertOne(data, (err, result) => {
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

async function getSchedule(req, res) {
    try {
        const course = await Schedule.find();
        res.status(200).json(course);
    } catch (error) {
        console.error('Error while finding schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function updateSchedule(req, res) {
    try {
      const id = req.query.id;
      const updatedCourse = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedCourse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  //delete the product by id
  async function deleteSchedule(req, res) {
    try {
      const id = req.query.id;
      console.log(id);
      const deletedCourse = await Schedule.findByIdAndRemove(id);
      const responseData = { message: 'deleted' };
      res.status(204).json(responseData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

module.exports = {
    Addschedule,
    getSchedule,
    updateSchedule,
    deleteSchedule,
};