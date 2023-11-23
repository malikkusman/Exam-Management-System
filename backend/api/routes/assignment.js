// routes.js or assignmentRoutes.js

const express = require('express');
const router = express.Router();
const Controller = require('../controllers/assignment');
const { upload } = require('../utils/multer'); // Importing upload from multer.js

router.post('/add', upload.single('file'), Controller.Add);
router.get('/get', (Controller.get))
router.get('/getbycategory', (Controller.getbycategory))
router.get('/getbyusername', (Controller.getbyteacher))
router.put('/update', upload.single('file'), (Controller.update))
router.delete('/delete', (Controller.delte))

module.exports=router;
