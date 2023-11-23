const Attendance = require('../models/attendance')
var { db } = require('../utils/mongodb');

async function Addattendance(req, res) {
    try {
        const fname = req.body.Firstname;
        const lname = req.body.Lastname;
        const username = req.body.Username;
        const status = req.body.Status;
        const date = req.body.Date;
        const active = true;

        const newAttendance = new Attendance({
            Firstname: fname,
            Lastname: lname,
            Username: username,
            Status: status,
            Date: date,
            active: active
        });

        await newAttendance.save(); // This triggers the middleware

        const responseData = { message: 'added' };
        res.status(200).json(responseData);
    } catch (e) {
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
async function getAttendancebyusername(req, res) {
    try {
        const Username = req.query.Username;
        const data = await Attendance.find({ Username: Username });
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
    updateAttendance,
    getAttendancebyusername
};