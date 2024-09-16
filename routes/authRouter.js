const express = require('express');
const router = express.Router();
const authController = require('./authController')

router.post('/userRegister', authController.register);
router.post('/userLogin', authController.login)

module.exports = router;