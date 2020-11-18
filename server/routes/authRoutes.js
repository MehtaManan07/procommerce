const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers')
router.get('/login', authController.trial)

module.exports = router