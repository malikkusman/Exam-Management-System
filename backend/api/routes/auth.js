const express = require('express');
const router=express.Router();
const registerController = require('../controllers/register');

router.post('/register', (registerController.RegisterUser)) 
router.post('/login', (registerController.getUsers))
router.get('/getall', (registerController.getallUsers))
router.delete('/delete', (registerController.deleteUser))
router.put('/update', (registerController.updateUser))

module.exports=router;
