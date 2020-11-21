const express = require('express');
// imoprt controllers
const categoryController = require('../controllers/SubcategoryControllers');
// import middlewares
const { authCheck, authorize } = require('../middlewares/auth');
const router = express.Router({ mergeParams: true });

router.use(authCheck);
router
  .route('/')
  .get(categoryController.getAll)
  .post(authorize('admin'), categoryController.create);

// All routes from this middlewares are available to logged in admin only
router.use(authorize('admin'));
router
  .route('/:id')
  .get(categoryController.getOne)
  .put(categoryController.updateOne)
  .delete(categoryController.deleteOne);

module.exports = router;
