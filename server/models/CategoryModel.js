const mongoose = require('mongoose');
// const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
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
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// categorySchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   console.log('slugify ran'.blue);
//   next();
// });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category
