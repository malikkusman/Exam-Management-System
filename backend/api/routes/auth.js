const express = require('express');
const router=express.Router();
const registerController = require('../controllers/register');

router.post('/register', (registerController.RegisterUser)) 
router.post('/login', (registerController.getUsers))

module.exports=router;
