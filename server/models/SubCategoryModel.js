const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Category must have a name'],
      maxlength: [20, 'Category name should be less than 20 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Parent category is required!!'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

subCategorySchema.pre(/^find/, function (next) {
  this.populate('parent', 'name');
  next();
});

const Subcategory = mongoose.model('Subcategory', subCategorySchema);
module.exports = Subcategory;
