// routes.js or assignmentRoutes.js

const express = require('express');
const router = express.Router();
const Controller = require('../controllers/logs');

router.post('/add', Controller.Add);

module.exports=router;
