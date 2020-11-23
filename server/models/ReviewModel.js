const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a Product!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true })

reviewSchema.pre(/^find/, function (next) {
  this.populate('user', 'name photo');
  next();
});

reviewSchema.statics.calcAvgRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  try {
    if (stats.length > 0) {
      await this.model('Product').findByIdAndUpdate(productId, {
        ratingsAverage: stats[0].avgRating,
        ratingsQuantity: stats[0].nRating,
      });
    } else {
      await this.model('Product').findByIdAndUpdate(productId, {
        ratingsAverage: 4.5,
        ratingsQuantity: 0,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAvgRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAvgRatings(this.r.product);
});

reviewSchema.pre('remove', function () {
  this.constructor.calcAvgRatings(this.product);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
