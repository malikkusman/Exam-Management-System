const express = require('express');
const router=express.Router();
const Controller = require('../controllers/attendance');

router.post('/add', (Controller.Addattendance)) 
router.get('/get', (Controller.getAttendance))
router.put('/update', (Controller.updateAttendance))

module.exports=router;
