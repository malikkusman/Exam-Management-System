const express = require('express');
const router=express.Router();
const Controller = require('../controllers/attendance');

router.post('/add', (Controller.Addattendance)) 
router.get('/get', (Controller.getAttendance))
router.put('/update', (Controller.updateAttendance))
router.get('/getuserattendance', (Controller.getAttendancebyusername))

module.exports=router;
