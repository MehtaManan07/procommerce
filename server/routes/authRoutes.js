const express = require('express');
const router = express.Router();
// imoprt controllers
const authController = require('../controllers/authControllers');

// import middlewares
const { authCheck } = require('../middlewares/auth');

router.post('/login', authCheck, authController.signup);
router.post('/me', authCheck, authController.getMe);

module.exports = router;
