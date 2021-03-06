const express = require('express');
const router = express.Router();
// imoprt controllers
const authController = require('../controllers/authControllers');

// import middlewares
const { authCheck } = require('../middlewares/auth');

router.post('/login', authCheck, authController.signup);
router.post('/me', authCheck, authController.getMe);
router.get('/logout', authController.logout);

// All routes from this middlewares are available to logged in admin only
// router.use(authorize('admin'));


module.exports = router;
