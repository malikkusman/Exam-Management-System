// routes.js or assignmentRoutes.js

const express = require('express');
const router = express.Router();
const Controller = require('../controllers/stuAssignment');
const { upload } = require('../utils/multer'); // Importing upload from multer.js

router.post('/add', upload.single('file'), Controller.Add);
router.get('/getbyusername', Controller.getbyusername);
router.get('/getbyteacher', Controller.getbyteacher);
router.get('/get', Controller.get);
router.put('/update', Controller.update);


module.exports=router;
