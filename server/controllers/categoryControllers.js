const Category = require('../models/CategoryModel');
const ErrorResponse = require('../middlewares/ErrorResponse');
const asyncHandler = require('../middlewares/async');

exports.create = asyncHandler(async (req, res, next) => {
    const {name} = req.body
  const newCategory = await Category.create({ name });
  if (!newCategory) {
    next(new ErrorResponse('Error while creating category', 500));
  }
  res.json({ success: true, data: newCategory })
});

exports.getOne = asyncHandler(async (req, res, next) => {});

exports.getAll = asyncHandler(async (req, res, next) => {});

exports.updateOne = asyncHandler(async (req, res, next) => {});

exports.deleteOne = asyncHandler(async (req, res, next) => {});
