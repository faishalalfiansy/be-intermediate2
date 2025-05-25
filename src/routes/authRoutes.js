const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register (POST)
router.post('/register', authController.register);

// Login (POST)
router.post('/login', authController.login);

// Update User (PUT)
router.put('/updates/:id', authController.updateUser);

// Get User by ID (GET)
router.get('/profiles/:id', authController.getUser);

module.exports = router;