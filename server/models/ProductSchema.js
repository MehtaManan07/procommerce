const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      text: true,
      required: [true, 'Product must have a title'],
      maxlength: 32,
      trim: true,
    },
    slug: {
      type: String,
      text: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      text: true,
      required: [true, 'Product must have a description'],
      index: true,
    },
    price: {
      type: Number,
      text: true,
      required: [true, 'Product must have a price'],
      index: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    },
    subcategories: [
      {
        type: ObjectId,
        ref: 'Subcategory',
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: [String],
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
    },
    color: {
      type: String,
      enum: ['white', 'black', 'blue', 'brown', 'yellow'], // will edit it later
    },
    brand: {
      type: String,
      enum: ['Apple', 'Microsoft', 'Lenovo', 'Dell', 'Asus'], // will edit it later
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
  });
  
const Product = mongoose.model('Product',productSchema)
module.exports = Product