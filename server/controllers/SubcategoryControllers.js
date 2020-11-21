const Subcategory = require('../models/SubcategoryModel');
const ErrorResponse = require('../middlewares/ErrorResponse');
const Category = require('../models/CategoryModel');
const asyncHandler = require('../middlewares/async');
const slugify = require('slugify');

exports.create = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  if (!req.body.parent) req.body.parent = req.params.id;
  const { name, parent } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`No such category exists: ${req.params.slug}`)
    );
  }
  const newSubcategory = await Subcategory.create({
    name,
    slug: slugify(name, { lower: true }),
    parent
  });
  res.status(201).json({
    success: true,
    data: newSubcategory,
  });
});

exports.getOne = asyncHandler(async (req, res, next) => {
  const category = await Subcategory.findOne({ _id: req.params.id });
  if (!category) {
    return next(new ErrorResponse(`No sub category found`, 404));
  }
  res.status(200).json({ success: true, data: category });
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const categories = await Subcategory.find({}).sort({ createdAt: -1 });
  if (!categories) {
    return next(new ErrorResponse(`No sub categories found`, 404));
  }
  res
    .status(200)
    .json({ success: true, count: categories.length, data: categories });
});

exports.updateOne = asyncHandler(async (req, res, next) => {
  const category = await Subcategory.findOne({ _id: req.params.id });
  if (!category) {
    return next(new ErrorResponse(`No sub category found`, 404));
  }
  const categoryNew = await Subcategory.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, slug: slugify(req.body.name, { lower: true }) },
    { new: true }
  );
  res.status(200).json({ success: true, data: categoryNew });
});

exports.deleteOne = asyncHandler(async (req, res, next) => {
  const category = await Subcategory.findOne({ _id: req.params.id });
  if (!category) {
    return next(new ErrorResponse(`No sub category found`, 404));
  }
  await category.remove();
  res.status(200).json({ success: true, data: category });
});
