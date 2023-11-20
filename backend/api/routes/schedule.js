const express = require('express');
const router=express.Router();
const scheduleController = require('../controllers/schedule');

router.post('/add', (scheduleController.Addschedule)) 
router.get('/get', (scheduleController.getSchedule))
router.put('/update', (scheduleController.updateSchedule))
router.delete('/delete', (scheduleController.deleteSchedule))

module.exports=router;
