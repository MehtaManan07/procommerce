const Category = require('../models/CategoryModel');
const ErrorResponse = require('../middlewares/ErrorResponse');
const asyncHandler = require('../middlewares/async');
const slugify = require('slugify');

exports.create = asyncHandler(async (req, res, next) => {
  const newCategory = await Category.create({
    name: req.body.name,
    slug: slugify(req.body.name, { lower: true }),
  });
  if (!newCategory) {
    next(new ErrorResponse('Error while creating category', 500));
  }
  res.status(201).json({ success: true, data: newCategory });
});

exports.getOne = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) {
    return next(new ErrorResponse(`No category found`, 404));
  }
  res.status(200).json({ success: true, data: category });
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).sort({ createdAt: -1 });
  if (!categories) {
    return next(new ErrorResponse(`No categories found`, 404));
  }
  res
    .status(200)
    .json({ success: true, count: categories.length, data: categories });
});

exports.updateOne = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) {
    return next(new ErrorResponse(`No category found`, 404));
  }
  const categoryNew = await Category.findOneAndUpdate(
    { slug: req.params.slug },
    { name: req.body.name, slug: slugify(req.body.name, { lower: true }) },
    { new: true }
  );
  res.status(200).json({ success: true, data: categoryNew });
});

exports.deleteOne = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) {
    return next(new ErrorResponse(`No category found`, 404));
  }
  await category.remove();
  res.status(204).json({ success: true });
});
