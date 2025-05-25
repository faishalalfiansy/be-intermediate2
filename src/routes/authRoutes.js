const express = require('express');
const router = express.Router();
const authController = require('../controllers/authContloller');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;