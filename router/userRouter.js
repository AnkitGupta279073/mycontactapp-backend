const express = require('express');
const validateToken = require('../middleware/validatorTokenHandler');
const router =express.Router();
const {userRegister,loginRegister,currentRegister} = require('../controller/userController');

router.route('/register').post(userRegister);
router.route('/login').post(loginRegister);
router.route('/current').get(validateToken,currentRegister);

module.exports = router;