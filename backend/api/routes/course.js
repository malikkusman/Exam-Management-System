const express = require('express');
const router=express.Router();
const courseController = require('../controllers/courses');

router.post('/add', (courseController.Addcourse)) 
router.get('/get', (courseController.getCourse))
router.put('/update', (courseController.updateCourse))
router.delete('/delete', (courseController.deleteCourse))

module.exports=router;
