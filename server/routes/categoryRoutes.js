const express = require('express');
const router = express.Router();
// imoprt controllers
const categoryController = require('../controllers/categoryControllers');
// import middlewares
const { authCheck, authorize } = require('../middlewares/auth');

router.use(authCheck);
router
  .route('/')
  .get(categoryController.getAll)
  .post(authorize('admin'), categoryController.create);

// All routes from this middlewares are available to logged in admin only
router.use(authorize('admin'));
router
  .route('/:slug')
  .get(categoryController.getOne)
  .put(categoryController.updateOne)
  .delete(categoryController.deleteOne);

module.exports = router;
