const Attendance = require('../models/attendance')
var { db } = require('../utils.js/mongodb');

async function Addattendance(req, res) {
    try {
        const fname = req.body.Firstname
        const lname = req.body.Lastname
        const username = req.body.Username
        const status = req.body.Status
        const date = req.body.Date
        const active = true
        const data = {
            Firstname: fname,
            Lastname: lname,
            Username: username,
            Status: status,
            Date: date,
            active: active
        }
        console.log('data', data)
        db.collection('attendances').insertOne(data, (err, result) => {
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

async function getAttendance(req, res) {
    try {
        const data = await Attendance.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error while finding course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function updateAttendance(req, res) {
    try {
      const id = req.query.id;
      console.log(req.body)
      const updated = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
      console.log(updated)
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  

module.exports = {
    Addattendance,
    getAttendance,
    updateAttendance
};