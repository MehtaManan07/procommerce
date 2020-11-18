const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'seller', 'user'],
    default: 'user',
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  photo: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  address: String,
  slug: String,
  wishList: [{type: mongoose.Schema.ObjectId, ref: "Product"}],
  createdAt: {
      type: Date,
      default: Date.now
  }
});

const User = mongoose.model('User', userSchema)
module.exports = User